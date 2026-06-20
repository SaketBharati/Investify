import React from "react";

function EquityTable() {
  return (
    <div className="container mt-5" style={{ maxWidth: "1200px" }}>
    <div className="table-responsive mt-4">
      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th style={{ width: "12%" }}></th>
            <th className="fw-normal fs-5 p-4">Equity delivery</th>
            <th className="fw-normal fs-5  p-4">Equity intraday</th>
            <th className="fw-normal fs-5  p-4">F&O - Futures</th>
            <th className="fw-normal fs-5 p-4">F&O - Options</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-4 text-muted">Brokerage</td>
            <td className="p-4">Zero Brokerage</td>
            <td className="p-4">
              0.03% or Rs. 20/executed order whichever is lower
            </td>
            <td className="p-4">
              0.03% or Rs. 20/executed order whichever is lower
            </td>
            <td className="p-4">Flat Rs. 20 per executed order</td>
          </tr>

          <tr>
            <td className="p-4 text-muted">STT/CTT</td>
            <td className="p-4">0.1% on buy & sell</td>
            <td className="p-4">0.025% on the sell side</td>
            <td className="p-4">0.05% on the sell side</td>
            <td className="p-4">
              <ul className="mb-0">
                <li>
                  0.15% of the intrinsic value on options that are bought and
                  exercised
                </li>
                <li>0.15% on sell side (on premium)</li>
              </ul>
            </td>
          </tr>

          <tr>
            <td className="p-4 text-muted">Transaction charges</td>
            <td className="p-4">
              NSE: 0.00307%
              <br />
              BSE: 0.00375%
            </td>
            <td className="p-4">
              NSE: 0.00307%
              <br />
              BSE: 0.00375%
            </td>
            <td className="p-4">
              NSE: 0.00183%
              <br />
              BSE: 0
            </td>
            <td className="p-4">
              NSE: 0.03553% (on premium)
              <br />
              BSE: 0.0325% (on premium)
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
            <td className="p-4">₹10 / crore</td>
            <td className="p-4">₹10 / crore</td>
          </tr>

          <tr>
            <td className="p-4 text-muted">Stamp charges</td>
            <td className="p-4">
              0.015% or ₹1500 / crore on buy side
            </td>
            <td className="p-4">
              0.003% or ₹300 / crore on buy side
            </td>
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

export default EquityTable;