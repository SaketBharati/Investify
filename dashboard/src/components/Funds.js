import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { api, createIdempotencyKey } from "../api";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const { refreshDashboard } = useContext(GeneralContext);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);
  const requestKey = useRef(null);
  const balanceController = useRef(null);

  const loadBalance = useCallback(() => {
    balanceController.current?.abort();
    const controller = new AbortController();
    balanceController.current = controller;
    setLoadingBalance(true);
    return api.get("/balance", { signal: controller.signal })
      .then((response) => {
        setBalance(response.data.balance);
        setAlert(null);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setAlert({
          type: "danger",
          message: error.response?.data?.message || "Unable to load your balance. Please try again.",
        });
      })
      .finally(() => { if (!controller.signal.aborted) setLoadingBalance(false); });
  }, []);

  useEffect(() => {
    loadBalance();
    return () => balanceController.current?.abort();
  }, [loadBalance]);

  const submit = async (event, action) => {
    event.preventDefault();
    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setAlert({ type: "danger", message: "Enter an amount greater than zero." });
      return;
    }
    setSubmitting(true);
    setAlert(null);
    const requestIdentity = `${action}:${parsedAmount}`;
    if (!requestKey.current || requestKey.current.identity !== requestIdentity) {
      requestKey.current = { identity: requestIdentity, key: createIdempotencyKey() };
    }
    try {
      const response = await api.post(action === "deposit" ? "/addFunds" : "/withdrawFunds", { amount: parsedAmount }, {
        headers: { "Idempotency-Key": requestKey.current.key },
      });
      setBalance(response.data.balance);
      setAlert({ type: "success", message: response.data.message });
      setAmount("");
      requestKey.current = null;
      refreshDashboard();
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || (error.code === "ECONNABORTED"
          ? "The request timed out. Check your balance before trying again."
          : "The request could not be completed. Please try again."),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return <>
    <div className="funds"><p>Manage your simulated trading funds</p></div>
    <div className="row"><div className="col">
      <div className="card shadow-sm p-4" style={{ borderRadius: "15px" }}>
        <h4>Available Balance</h4>
        {loadingBalance && balance === null ? <p role="status">Loading balance…</p> : balance === null
          ? <p role="alert" className="text-danger">Balance unavailable. Retry to load your account balance.</p>
          : <>
            <h2 style={{ color: "#4184f3", marginTop: "15px" }}>₹{Number(balance).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</h2>
            <p style={{ color: "gray" }}>Available for simulated trading</p>
          </>}
        {balance === null && <button type="button" className="btn btn-outline-primary" onClick={loadBalance} disabled={loadingBalance}>Retry</button>}
      </div>
      {alert && <div className={`alert alert-${alert.type} mt-3`} role="alert">{alert.message}</div>}
      <form className="card shadow-sm p-4 mt-4" style={{ borderRadius: "15px" }} onSubmit={(event) => submit(event, "deposit")}>
        <h5>Manage Funds</h5>
        <label className="form-label mt-3" htmlFor="fund-amount">Amount</label>
        <input id="fund-amount" type="number" min="0.01" step="0.01" inputMode="decimal" className="form-control" placeholder="Enter amount" value={amount} onChange={(event) => setAmount(event.target.value)} disabled={submitting} required />
        <div className="mt-3">
          <button type="submit" className="btn btn-success me-2" disabled={submitting || balance === null}>{submitting ? "Processing…" : "Add Funds"}</button>
          <button type="button" className="btn btn-danger" disabled={submitting || balance === null} onClick={(event) => submit(event, "withdraw")}>{submitting ? "Processing…" : "Withdraw"}</button>
        </div>
      </form>
    </div></div>
  </>;
};

export default Funds;
