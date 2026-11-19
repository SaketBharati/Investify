import React, { useContext, useRef, useState } from "react";
import GeneralContext from "./GeneralContext";
import { api, createIdempotencyKey } from "../api";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow, refreshDashboard, notify } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState("1");
  const [stockPrice, setStockPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const requestKey = useRef(null);

  const handleBuy = async (event) => {
    event.preventDefault();
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);
    if (!Number.isSafeInteger(qty) || qty <= 0 || !Number.isFinite(price) || price <= 0) {
      setError(true);
      setMessage("Enter a positive whole quantity and a price greater than zero.");
      return;
    }
    setSubmitting(true);
    setError(false);
    setMessage("");
    const requestIdentity = `${uid}:BUY:${qty}:${price}`;
    if (!requestKey.current || requestKey.current.identity !== requestIdentity) {
      requestKey.current = { identity: requestIdentity, key: createIdempotencyKey() };
    }
    try {
      const response = await api.post("/newOrder", { name: uid, qty, price, mode: "BUY" }, {
        headers: { "Idempotency-Key": requestKey.current.key },
      });
      notify(response.data.message, "success");
      setMessage(response.data.message);
      refreshDashboard();
      closeBuyWindow();
    } catch (requestError) {
      setError(true);
      setMessage(requestError.response?.data?.message || "The order could not be placed. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return <div className="container" id="buy-window" role="dialog" aria-modal="true" aria-labelledby="buy-window-title">
    <form onSubmit={handleBuy}>
      <div className="regular-order">
        <h2 id="buy-window-title" className="visually-hidden">Buy {uid}</h2>
        {message && <div className={`alert alert-${error ? "danger" : "success"}`} role="status">{message}</div>}
        <div className="inputs">
          <fieldset><legend>Qty.</legend><input aria-label="Quantity" type="number" min="1" step="1" value={stockQuantity} onChange={(event) => setStockQuantity(event.target.value)} disabled={submitting} required /></fieldset>
          <fieldset><legend>Price</legend><input aria-label="Price" type="number" min="0.01" step="0.01" value={stockPrice} onChange={(event) => setStockPrice(event.target.value)} disabled={submitting} required /></fieldset>
        </div>
      </div>
      <div className="buttons">
        <span>Simulated order · {uid}</span>
        <div>
          <button type="submit" className="btn btn-blue" disabled={submitting}>{submitting ? "Placing…" : "Buy"}</button>
          <button type="button" className="btn btn-grey" onClick={closeBuyWindow} disabled={submitting}>Cancel</button>
        </div>
      </div>
    </form>
  </div>;
};

export default BuyActionWindow;
