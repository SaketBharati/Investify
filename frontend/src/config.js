const production = process.env.NODE_ENV === "production";
const apiUrl = process.env.REACT_APP_API_URL;
const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL;

if (production && (!apiUrl || !dashboardUrl)) {
  throw new Error("Production frontend requires REACT_APP_API_URL and REACT_APP_DASHBOARD_URL.");
}

export const API_URL = apiUrl || "http://localhost:8080";
export const DASHBOARD_URL = dashboardUrl || "http://localhost:3001";
