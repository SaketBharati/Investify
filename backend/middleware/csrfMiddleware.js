function parseCookies(header = "") {
  return Object.fromEntries(header.split(";").map((part) => {
    const index = part.indexOf("=");
    if (index < 0) return ["", ""];
    const key = part.slice(0, index).trim();
    try { return [key, decodeURIComponent(part.slice(index + 1).trim())]; }
    catch (_error) { return [key, ""]; }
  }).filter(([key]) => key));
}

function csrfMiddleware(req, res, next) {
  if (req.authType !== "cookie") return next();
  const origin = req.get("Origin");
  const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean);
  const isLocal = process.env.NODE_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(origin || "");
  const cookies = parseCookies(req.headers.cookie);
  const headerToken = req.get("X-CSRF-Token");
  if ((!isLocal && !allowedOrigins.includes(origin)) || !headerToken || headerToken !== cookies.investify_csrf) {
    return res.status(403).json({ success: false, code: "CSRF_INVALID", message: "Request could not be verified. Refresh and try again." });
  }
  return next();
}

module.exports = { csrfMiddleware, parseCookies };
