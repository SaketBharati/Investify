import React, { useContext, useEffect, useRef, useState } from "react";
import { api, createIdempotencyKey } from "../api";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow, refreshDashboard, notify } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState("1");
  const [stockPrice, setStockPrice] = useState("");
  const [availableQty, setAvailableQty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const requestKey = useRef(null);

  useEffect(() => {
    let active = true;
    api.get(`/holding/${encodeURIComponent(uid)}`)
      .then((response) => {
        if (active) {
          setAvailableQty(response.data.qty);
          setStockPrice(String(response.data.price || ""));
        }
      })
      .catch((requestError) => {
        if (active) {
          setAvailableQty(0);
          setError(true);
          setMessage(requestError.response?.data?.message || "Unable to load this holding.");
        }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [uid]);

  const handleSell = async (event) => {
    event.preventDefault();
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);
    if (!Number.isSafeInteger(qty) || qty <= 0 || qty > availableQty || !Number.isFinite(price) || price <= 0) {
      setError(true);
      setMessage("Enter a valid quantity up to your available shares and a price greater than zero.");
      return;
    }
    setSubmitting(true);
    setError(false);
    setMessage("");
    const requestIdentity = `${uid}:SELL:${qty}:${price}`;
    if (!requestKey.current || requestKey.current.identity !== requestIdentity) {
      requestKey.current = { identity: requestIdentity, key: createIdempotencyKey() };
    }
    try {
      const response = await api.post("/newOrder", { name: uid, qty, price, mode: "SELL" }, {
        headers: { "Idempotency-Key": requestKey.current.key },
      });
      notify(response.data.message, "success");
      refreshDashboard();
      closeSellWindow();
    } catch (requestError) {
      setError(true);
      setMessage(requestError.response?.data?.message || "The order could not be placed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return <div className="container" id="buy-window" role="dialog" aria-modal="true" aria-labelledby="sell-window-title">
    <form onSubmit={handleSell}>
      <div className="regular-order">
        <h2 id="sell-window-title" className="visually-hidden">Sell {uid}</h2>
        {message && <div className={`alert alert-${error ? "danger" : "success"}`} role="status">{message}</div>}
        <div className="inputs">
          <fieldset><legend>Qty.</legend><input aria-label="Quantity" type="number" min="1" step="1" max={availableQty ?? undefined} value={stockQuantity} onChange={(event) => setStockQuantity(event.target.value)} disabled={submitting || loading || availableQty === 0} required /></fieldset>
          <fieldset><legend>Price</legend><input aria-label="Price" type="number" min="0.01" step="0.01" value={stockPrice} onChange={(event) => setStockPrice(event.target.value)} disabled={submitting || loading} required /></fieldset>
        </div>
        <p>Available Quantity: {loading ? "Loading…" : availableQty}</p>
      </div>
      <div className="buttons">
        <span>Simulated order · {uid}</span>
        <div>
          <button type="submit" className="btn btn-danger" disabled={submitting || loading || availableQty === 0}>{submitting ? "Placing…" : "Sell"}</button>
          <button type="button" className="btn btn-grey" onClick={closeSellWindow} disabled={submitting}>Cancel</button>
        </div>
      </div>
    </form>
  </div>;
};

export default SellActionWindow;
