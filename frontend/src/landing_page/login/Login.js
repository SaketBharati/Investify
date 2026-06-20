import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
  useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://investify-dashboard-r5qx.onrender.com/login", {
        email,
        password,
      });

      setAlertType("success");
      setAlertMessage("Login Successful");

      setTimeout(() => {
        localStorage.setItem("token", res.data.token);

        localStorage.setItem("user", JSON.stringify(res.data.user));

        window.location.href = `https://investify-dashboard-r5qx.onrender.com?token=${res.data.token}&username=${encodeURIComponent(
          res.data.user.username,
        )}&email=${encodeURIComponent(res.data.user.email)}`;
      }, 1000);
    } catch (err) {
      console.log(err);

      setAlertType("danger");

      setAlertMessage(
        err.response?.data?.message || err.message || "Login Failed",
      );
    }
  };

  return (
    <div className="auth-page">
    <div
  className="container d-flex justify-content-center align-items-center"
  style={{ minHeight: "85vh" }}
>
  <div
    className="card shadow auth-card p-4"
    style={{
      width: "100%",
      maxWidth: "450px",
      borderRadius: "20px",
      border: "none",
    }}
  >
    <img
      src="/logo.png"
      alt="Logo"
      width="60"
      className="d-block mx-auto mb-3"
    />

    <h3 className="text-center mb-4">
      Welcome Back
    </h3>
    <p
  className="text-center text-muted mb-4"
>
  Sign in to access your portfolio
</p>

    {alertMessage && (
      <div
        className={`alert alert-${alertType}`}
        role="alert"
      >
        {alertMessage}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">
          Email
        </label>

        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Password
        </label>

        <div className="input-group">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>
      </div>

      <button
        className="btn btn-primary w-100 py-2 fw-bold"
      >
        Login
      </button>

      <p className="text-center mt-3 mb-0">
        Don't have an account?{" "}
        <a
          href="/signup" className="auth-link"
          style={{
            textDecoration: "none",
          }}
        >
          Sign Up
        </a>
      </p>
    </form>
    <hr />

<p
  className="text-center text-muted mb-0"
  style={{ fontSize: "14px" }}
>
  © 2026 Zerodha Clone
</p>
  </div>
  </div>
</div>
  );
};

export default Login;
