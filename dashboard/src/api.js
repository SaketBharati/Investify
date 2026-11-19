import axios from "axios";
import { API_URL, FRONTEND_URL } from "./config";

export const api = axios.create({ baseURL: API_URL, timeout: 15000, withCredentials: true });

let redirectingForAuthentication = false;
let csrfToken = "";

export function setCsrfToken(value) {
  csrfToken = typeof value === "string" ? value : "";
}

api.interceptors.request.use((config) => {
  if (["post", "put", "patch", "delete"].includes(config.method?.toLowerCase()) && csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !redirectingForAuthentication) {
      redirectingForAuthentication = true;
      try {
        localStorage.removeItem("user");
      } catch (_storageError) {
        // Navigation still recovers when browser storage is unavailable.
      }
      window.location.replace(`${FRONTEND_URL}/login`);
    }
    return Promise.reject(error);
  },
);

export function createIdempotencyKey() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user && typeof user === "object" ? user : null;
  } catch (_error) {
    try { localStorage.removeItem("user"); } catch (_storageError) { /* unavailable storage */ }
    return null;
  }
}
