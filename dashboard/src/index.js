import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import { FRONTEND_URL } from "./config";
import { api, setCsrfToken } from "./api";

let initializationPromise;

function setAuthStorage(user) {
  try {
    localStorage.removeItem("token");
    localStorage.setItem("user", JSON.stringify(user));
  } catch (_error) {
    // The HttpOnly auth cookie remains the source of truth if storage is unavailable.
  }
}

function initializeAuthentication() {
  if (initializationPromise) return initializationPromise;
  initializationPromise = (async () => {
    const url = new URL(window.location.href);
    const handoffCode = url.searchParams.get("code");
    if (handoffCode) {
      url.searchParams.delete("code");
      window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
      const exchange = await api.post("/auth/exchange", { code: handoffCode });
      setCsrfToken(exchange.data.csrfToken);
      setAuthStorage(exchange.data.user);
    }

    let legacyToken = null;
    try { legacyToken = localStorage.getItem("token"); } catch (_error) { legacyToken = null; }
    if (legacyToken) {
      const session = await api.post("/auth/session", {}, { headers: { Authorization: `Bearer ${legacyToken}` } });
      setCsrfToken(session.data.csrfToken);
      setAuthStorage(session.data.user);
    }

    const response = await api.get("/profile");
    const profile = response.data?.user;
    if (!profile || !(profile.id || profile._id)) throw new Error("The account response was incomplete. Please sign in again.");
    const user = { ...profile, id: profile.id || profile._id };
    setAuthStorage(user);
    const csrf = await api.get("/auth/csrf");
    setCsrfToken(csrf.data.csrfToken);
    return user;
  })().catch((error) => {
    initializationPromise = null;
    throw error;
  });
  return initializationPromise;
}

function AuthenticatedApp() {
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const initialize = () => {
    setStatus("loading");
    setErrorMessage("");
    initializeAuthentication().then((user) => {
      if (user) setStatus("ready");
    }).catch((error) => {
      if (error.response?.status === 401) return;
      setErrorMessage(error.response?.data?.message || error.message || "Unable to connect to Investify.");
      setStatus("error");
    });
  };

  useEffect(() => {
    initialize();
    const handlePageShow = (event) => {
      if (event.persisted) api.get("/profile").catch(() => {});
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  if (status === "loading") return <main className="container py-5" role="status">Loading your account…</main>;
  if (status === "error") {
    return <main className="container py-5" role="alert">
      <h2>Dashboard unavailable</h2>
      <p>{errorMessage}</p>
      <button className="btn btn-primary" onClick={initialize}>Try again</button>
      <button className="btn btn-link" onClick={() => window.location.replace(`${FRONTEND_URL.replace(/\/$/, "")}/login`)}>Sign in</button>
    </main>;
  }
  return <Home />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes><Route path="/*" element={<AuthenticatedApp />} /></Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
