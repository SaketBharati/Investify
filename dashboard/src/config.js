const production = process.env.NODE_ENV === "production";
const apiUrl = process.env.REACT_APP_API_URL;
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

if (production && (!apiUrl || !frontendUrl)) {
  throw new Error("Production dashboard requires REACT_APP_API_URL and REACT_APP_FRONTEND_URL.");
}

export const API_URL = apiUrl || "http://localhost:8080";
export const FRONTEND_URL = frontendUrl || "http://localhost:3000";
