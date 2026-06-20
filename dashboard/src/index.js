import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

const params = new URLSearchParams(window.location.search);

const username = params.get("username");

const token = params.get("token");

if (token) {
  localStorage.setItem("token", token);
  if (username) {

    localStorage.setItem(
      "user",
      JSON.stringify({
        username,
      })
    );

  }

  window.history.replaceState({}, document.title, "/");
}

const storedToken = localStorage.getItem("token");

if (!storedToken) {
  window.location.href = "http://localhost:3000/login";
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
