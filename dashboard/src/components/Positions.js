import React, { useContext, useEffect, useState } from "react";
import { api } from "../api";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    api.get("/addPositions").then((response) => {
      if (active) { setTrades(response.data); setError(""); }
    }).catch((requestError) => {
      if (active) setError(requestError.response?.data?.message || "Unable to load trade history.");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [refreshKey]);

  if (loading && !trades.length) return <p role="status">Loading trade history…</p>;
  if (error && !trades.length) return <div className="alert alert-danger" role="alert">{error}</div>;
  return <>
    <h3 className="title">Trade History ({trades.length})</h3>
    {error && <div className="alert alert-warning" role="alert">{error}</div>}
    <div className="order-table"><table>
      <thead><tr><th>Date</th><th>Time</th><th>Instrument</th><th>Type</th><th>Qty.</th><th>Price</th><th>Value</th></tr></thead>
      <tbody>{trades.map((trade) => {
        const date = new Date(trade.createdAt);
        return <tr key={trade._id}>
          <td>{date.toLocaleDateString("en-IN")}</td><td>{date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</td>
          <td>{trade.name}</td><td className={trade.mode === "BUY" ? "profit" : "loss"}>{trade.mode}</td>
          <td>{trade.qty}</td><td>₹{Number(trade.price).toFixed(2)}</td><td>₹{(trade.qty * trade.price).toFixed(2)}</td>
        </tr>;
      })}</tbody>
    </table></div>
  </>;
};

export default Positions;
