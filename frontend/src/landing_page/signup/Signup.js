import { useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../../config";

const Signup = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.post("/signup", {
        username,
        email,
        password,
      });

      setAlertType("success");
      setAlertMessage("Account created successfully");

      if (!res.data.handoffCode) throw new Error("Account was created, but sign-in could not be completed. Please log in.");
      window.location.replace(`${DASHBOARD_URL}?code=${encodeURIComponent(res.data.handoffCode)}`);
    } catch (err) {
      setAlertType("danger");

      setAlertMessage(err.response?.data?.message || "Signup Failed");
    } finally {
      setIsSubmitting(false);
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

          <h3 className="text-center mb-4">Create Your Account</h3>
          <p className="text-center text-muted mb-4">
            Create your Investify account
          </p>

          {alertMessage && (
            <div className={`alert alert-${alertType}`} role="alert">
              {alertMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="signup-username">Username</label>

              <input
                type="text"
                id="signup-username"
                name="username"
                autoComplete="username"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="signup-email">Email</label>

              <input
                type="email"
                id="signup-email"
                name="email"
                autoComplete="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="signup-password">Password</label>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  name="password"
                  autoComplete="new-password"
                  className="form-control"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={isSubmitting}>
              {isSubmitting ? "Creating account…" : "Sign Up"}
            </button>

            <p className="text-center mt-3 mb-0">
              Already have an account?{" "}
              <Link
                to="/login"
                className="auth-link"
                style={{ textDecoration: "none" }}
              >
                Login
              </Link>
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

export default Signup;
