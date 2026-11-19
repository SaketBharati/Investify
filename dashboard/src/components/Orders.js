import React, { useContext, useEffect, useState } from "react";
import { api } from "../api";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const { refreshKey } = useContext(GeneralContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    api.get("/orders").then((response) => {
      if (active) { setOrders(response.data); setError(""); }
    }).catch((requestError) => {
      if (active) setError(requestError.response?.data?.message || "Unable to load orders.");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [refreshKey]);

  if (loading && !orders.length) return <p role="status">Loading orders…</p>;
  if (error && !orders.length) return <div className="alert alert-danger" role="alert">{error}</div>;
  return <>
    <h3 className="title">Orders ({orders.length})</h3>
    {error && <div className="alert alert-warning" role="alert">{error}</div>}
    <div className="order-table"><table>
      <thead><tr><th>Stock</th><th>Qty</th><th>Price</th><th>Mode</th></tr></thead>
      <tbody>{orders.map((order) => <tr key={order._id}><td>{order.name}</td><td>{order.qty}</td><td>{order.price}</td><td>{order.mode}</td></tr>)}</tbody>
    </table></div>
  </>;
};

export default Orders;
