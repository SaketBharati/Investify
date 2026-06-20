import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

axios.get(
  "https://investify-y1ph.onrender.com/orders",
  {
    headers: {
      Authorization: token,
    },
  }
)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="order-table">
      <table>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Mode</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.name}</td>
              <td>{order.qty}</td>
              <td>{order.price}</td>
              <td>{order.mode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default Orders;