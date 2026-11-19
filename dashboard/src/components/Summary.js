import React, { useContext, useEffect, useState } from "react";
import GeneralContext from "./GeneralContext";
import { api, getStoredUser } from "../api";

const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const Summary = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [account, setAccount] = useState({ balance: null, holdings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const username = getStoredUser()?.username || "there";

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([api.get("/balance"), api.get("/addHoldings")])
      .then(([balanceResponse, holdingsResponse]) => {
        if (!active) return;
        setAccount({ balance: balanceResponse.data.balance, holdings: holdingsResponse.data });
        setError("");
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || "Unable to load your account summary.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [refreshKey]);

  const investment = account.holdings.reduce((total, holding) => total + Number(holding.avg || 0) * Number(holding.qty || 0), 0);
  const recordedValue = account.holdings.reduce((total, holding) => total + Number(holding.price || 0) * Number(holding.qty || 0), 0);

  if (loading && account.balance === null) return <p role="status">Loading account summary…</p>;
  if (error && account.balance === null) return <div role="alert" className="alert alert-danger">{error}</div>;

  return <>
    <div className="card shadow-sm p-4 mb-4" style={{ borderRadius: "15px" }}>
      <h3>Welcome back, {username}</h3>
      <p className="text-muted mb-0">Your simulated account overview.</p>
      {error && <p className="alert alert-warning mt-3 mb-0">{error}</p>}
    </div>
    <div className="section">
      <span><p>Account</p></span>
      <div className="data">
        <div className="first"><h3>{money(account.balance)}</h3><p>Available simulated balance</p></div>
      </div>
      <hr className="divider" />
    </div>
    <div className="section">
      <span><p>Holdings ({account.holdings.length})</p></span>
      <div className="data">
        <div className="first"><h3>{money(recordedValue - investment)}</h3><p>Recorded P&amp;L estimate</p></div>
        <hr />
        <div className="second">
          <p>Recorded value <span>{money(recordedValue)}</span></p>
          <p>Cost basis <span>{money(investment)}</span></p>
        </div>
      </div>
      <p className="text-muted">Uses the last prices saved with your simulated trades; these are not live market valuations.</p>
      <hr className="divider" />
    </div>
  </>;
};

export default Summary;
