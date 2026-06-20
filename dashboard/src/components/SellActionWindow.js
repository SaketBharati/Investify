import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [availableQty, setAvailableQty] = useState(0);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8080/holding/${uid}`,
        {
        headers: {
          Authorization: token,
        },
      }
      )
      .then((res) => {
        if (res.data) {
          setAvailableQty(res.data.qty);
        } else {
          setAvailableQty(0);
        }
      })
      .catch((err) => {
        console.log(err);
        setAvailableQty(0);
      });
  }, [uid]);

  const handleSellClick = () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8080/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      },{
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setAlertType("success");
        setAlertMessage(res.data.message);

        setTimeout(() => {
          generalContext.closeSellWindow();
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setAlertType("danger");
        setAlertMessage(
          err.response?.data?.message || "Something went wrong"
        );
      });
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">

        {alertMessage && (
          <div
            className={`alert alert-${alertType}`}
            role="alert"
          >
            {alertMessage}
          </div>
        )}

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              max={availableQty}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
              required
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
              required
            />
          </fieldset>
        </div>

        <p style={{ marginTop: "10px" }}>
          Available Quantity: {availableQty}
        </p>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>

        <div>
          <button
            className="btn btn-danger"
            onClick={handleSellClick}
          >
            SELL
          </button>

          <button
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;