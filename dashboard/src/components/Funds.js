import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";

const Funds = () => {
  const [amount, setAmount] =
  useState("");

const [alertMessage,
  setAlertMessage] =
  useState("");

const [alertType,
  setAlertType] =
  useState("");

  const [balance, setBalance] =
    useState(0);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    axios
      .get(
        "http://localhost:8080/balance",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setBalance(res.data.balance);
      })
      .catch((err) =>
        console.log(err)
      );

  }, []);
  const token =
  localStorage.getItem("token");

const handleAddFunds = () => {

  axios.post(
    "http://localhost:8080/addFunds",
    {
      amount,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  )
  .then((res) => {

    setBalance(
      res.data.balance
    );

    setAlertType("success");

    setAlertMessage(
      res.data.message
    );

    setAmount("");

  })
  .catch((err) => {

    setAlertType("danger");

    setAlertMessage(
      err.response?.data?.message
    );

  });

};

const handleWithdrawFunds =
() => {

  axios.post(
    "http://localhost:8080/withdrawFunds",
    {
      amount,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  )
  .then((res) => {

    setBalance(
      res.data.balance
    );

    setAlertType("success");

    setAlertMessage(
      res.data.message
    );

    setAmount("");

  })
  .catch((err) => {

    setAlertType("danger");

    setAlertMessage(
      err.response?.data?.message
    );

  });

};

  return (
    <>
      <div className="funds">

        <p>
          Manage your trading funds
        </p>

      </div>

      <div className="row">

        <div className="col">

          <div
            className="card shadow-sm p-4"
            style={{
              borderRadius: "15px",
            }}
          >

            <h4>
              Available Balance
            </h4>

            <h2
              style={{
                color: "#4184f3",
                marginTop: "15px",
              }}
            >
              ₹
              {balance.toLocaleString(
                "en-IN"
              )}
            </h2>

            <p
              style={{
                color: "gray",
              }}
            >
              Available for trading
            </p>

          </div>
          {alertMessage && (
  <div
    className={`alert alert-${alertType} mt-3`}
  >
    {alertMessage}
  </div>
)}

<div
  className="card shadow-sm p-4 mt-4"
  style={{
    borderRadius: "15px",
  }}
>

  <h5>
    Manage Funds
  </h5>

  <input
    type="number"
    className="form-control mt-3"
    placeholder="Enter amount"
    value={amount}
    onChange={(e) =>
      setAmount(e.target.value)
    }
  />

  <div className="mt-3">

    <button
      className="btn btn-success me-2"
      onClick={handleAddFunds}
    >
      Add Funds
    </button>

    <button
      className="btn btn-danger"
      onClick={
        handleWithdrawFunds
      }
    >
      Withdraw
    </button>

  </div>

</div>

        </div>

      </div>
    </>
  );
};

export default Funds;