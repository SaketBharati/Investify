import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {

  const [allPositions, setAllPositions] =
    useState([]);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    axios
      .get(
        "https://investify-y1ph.onrender.com/addPositions",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setAllPositions(res.data);
      })
      .catch((err) =>
        console.error(err)
      );

  }, []);

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-IN");
  };

  const formatTime = (date) => {
    return new Date(date)
      .toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
  };

  return (
    <>
      <h3 className="title">
        Trade History (
        {allPositions.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Instrument</th>
              <th>Type</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            {allPositions.map(
              (trade, index) => {

                const value =
                  trade.qty *
                  trade.price;

                return (
                  <tr key={index}>

                    <td>
                      {formatDate(
                        trade.createdAt
                      )}
                    </td>

                    <td>
                      {formatTime(
                        trade.createdAt
                      )}
                    </td>

                    <td>
                      {trade.name}
                    </td>

                    <td
                      className={
                        trade.mode ===
                        "BUY"
                          ? "profit"
                          : "loss"
                      }
                    >
                      {trade.mode}
                    </td>

                    <td>
                      {trade.qty}
                    </td>

                    <td>
                      ₹
                      {Number(
                        trade.price
                      ).toFixed(2)}
                    </td>

                    <td>
                      ₹
                      {value.toFixed(
                        2
                      )}
                    </td>

                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;