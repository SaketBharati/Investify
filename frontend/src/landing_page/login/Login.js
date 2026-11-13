import { useState } from "react";
import axios from "axios";
import { API_URL, DASHBOARD_URL } from "../../config";

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
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      setAlertType("success");
      setAlertMessage("Login Successful");

      setTimeout(() => {
        localStorage.setItem("token", res.data.token);

        localStorage.setItem("user", JSON.stringify(res.data.user));

        window.location.href = `${DASHBOARD_URL}?token=${res.data.token}&username=${encodeURIComponent(
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
      src="media\images\logo.svg"
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
        <label className="form-label" htmlFor="login-email">
          Email
        </label>

        <input
          type="email"
          id="login-email"
          name="email"
          autoComplete="email"
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
        <label className="form-label" htmlFor="login-password">
          Password
        </label>

        <div className="input-group">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            id="login-password"
            name="password"
            autoComplete="current-password"
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
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
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
        type="submit"
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
  © 2026 Investify
</p>
  </div>
  </div>
</div>
  );
};

export default Login;
