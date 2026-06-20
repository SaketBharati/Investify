import React from "react";

function CurrencyTable() {
  return (
    <div className="container mt-5" style={{ maxWidth: "1200px" }}>
    <div className="table-responsive mt-4">
      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th style={{ width: "18%" }}></th>
            <th className="fw-normal fs-5 p-4">Currency futures</th>
            <th className="fw-normal fs-5 p-4">Currency options</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-4 text-muted">Brokerage</td>
            <td className="p-4">
              0.03% or ₹20/executed order whichever is lower
            </td>
            <td className="p-4">₹20/executed order</td>
          </tr>

          <tr>
            <td className="p-4 text-muted">STT/CTT</td>
            <td className="p-4">No STT</td>
            <td className="p-4">No STT</td>
          </tr>

          <tr>
            <td className="p-4 text-muted">Transaction charges</td>
            <td className="p-4">
              NSE: 0.00035%
              <br />
              BSE: 0.00045%
            </td>
            <td className="p-4">
              NSE: 0.0311%
              <br />
              BSE: 0.001%
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
            <td className="p-4">₹10 / crore</td>
            <td className="p-4">₹10 / crore</td>
          </tr>

          <tr>
            <td className="p-4 text-muted">Stamp charges</td>
            <td className="p-4">
              0.0001% or ₹10 / crore on buy side
            </td>
            <td className="p-4">
              0.0001% or ₹10 / crore on buy side
            </td>
          </tr>
        </tbody>
      </table>

      </div>
    </div>
  );
}

export default CurrencyTable;