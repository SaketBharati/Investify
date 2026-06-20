import React from "react";

function CommodityTable() {
  return (
    <div className="container mt-5" style={{ maxWidth: "1200px" }}>
    <div className="table-responsive mt-4">
      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th style={{ width: "18%" }}></th>
            <th className="fw-normal fs-5  p-4">Commodity futures</th>
            <th className="fw-normal fs-5 p-4">Commodity options</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-4 text-muted">Brokerage</td>
            <td className="p-4 ">
              0.03% or Rs. 20/executed order whichever is lower
            </td>
            <td className="p-4 ">₹20/executed order</td>
          </tr>

          <tr>
            <td className="p-4 text-muted">STT/CTT</td>
            <td className="p-4 ">0.01% on sell side (Non-Agri)</td>
            <td className="p-4">0.05% on sell side</td>
          </tr>

          <tr>
            <td className="p-4 text-muted">Transaction charges</td>
            <td className="p-4">
              MCX: 0.0021%
              <br />
              NSE: 0.0001%
            </td>
            <td className="p-4">
              MCX: 0.0418%
              <br />
              NSE: 0.001%
            </td>
          </tr>

          <tr>
            <td className="p-4 text-muted">GST</td>
            <td className="p-4">
              18% on (brokerage + SEBI charges + transaction charges)
            </td>
            <td className="p-4">
              18% on (brokerage + SEBI charges + transaction charges)
            </td>
          </tr>

          <tr>
            <td className="p-4 text-muted">SEBI charges</td>
            <td className="p-4">
              <strong>Agri:</strong>
              <br />
              ₹1 / crore
              <br />
              <strong>Non-agri:</strong>
              <br />
              ₹10 / crore
            </td>
            <td className="p-4">₹10 / crore</td>
          </tr>

          <tr>
            <td className="p-4 text-muted">Stamp charges</td>
            <td className="p-4">
              0.002% or ₹200 / crore on buy side
            </td>
            <td className="p-4">
              0.003% or ₹300 / crore on buy side
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default CommodityTable;