import React, { useContext, useEffect, useState } from "react";
import { api } from "../api";
import GeneralContext from "./GeneralContext";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/addHoldings")
      .then((response) => { if (active) { setAllHoldings(response.data); setError(""); } })
      .catch((requestError) => { if (active) setError(requestError.response?.data?.message || "Unable to load holdings."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [refreshKey]);

  const labels = allHoldings.map((holding) => holding.name);
  const data = { labels, datasets: [{ label: "Recorded Price", data: allHoldings.map((holding) => holding.price), backgroundColor: "rgba(255, 99, 132, 0.5)" }] };
  const costBasis = allHoldings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
  const recordedValue = allHoldings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);

  if (loading && !allHoldings.length) return <p role="status">Loading holdings…</p>;
  if (error && !allHoldings.length) return <div className="alert alert-danger" role="alert">{error}</div>;

  return <>
    <h3 className="title">Holdings ({allHoldings.length})</h3>
    {error && <div className="alert alert-warning" role="alert">{error}</div>}
    <div className="order-table"><table>
      <thead><tr><th>Instrument</th><th>Qty.</th><th>Avg. cost</th><th>Recorded price</th><th>Recorded value</th><th>P&amp;L estimate</th><th>Net chg.</th><th>Day chg.</th></tr></thead>
      <tbody>{allHoldings.map((stock) => {
        const value = stock.price * stock.qty;
        const pnl = value - stock.avg * stock.qty;
        return <tr key={stock._id || stock.name}>
          <td>{stock.name}</td><td>{stock.qty}</td><td>{Number(stock.avg).toFixed(2)}</td><td>{Number(stock.price).toFixed(2)}</td><td>{value.toFixed(2)}</td>
          <td className={pnl >= 0 ? "profit" : "loss"}>{pnl.toFixed(2)}</td><td>{stock.net || "—"}</td><td>{stock.day || "—"}</td>
        </tr>;
      })}</tbody>
    </table></div>
    <div className="row">
      <div className="col"><h5>{costBasis.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</h5><p>Cost basis</p></div>
      <div className="col"><h5>{recordedValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</h5><p>Recorded value</p></div>
      <div className="col"><h5>{(recordedValue - costBasis).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</h5><p>Recorded P&amp;L estimate</p></div>
    </div>
    <p className="text-muted">Prices are saved trade prices, not live market quotes.</p>
    <VerticalGraph data={data} />
  </>;
};

export default Holdings;
