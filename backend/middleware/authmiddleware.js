const jwt = require("jsonwebtoken");
const { parseCookies } = require("./csrfMiddleware");

const authMiddleware = (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    const cookieToken = parseCookies(req.headers.cookie).investify_auth;

    if (!authorization && !cookieToken) {
      return res.status(401).json({
        success: false,
        code: "AUTH_REQUIRED",
        message: "Authentication is required",
      });
    }

    const token = authorization
      ? (authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : authorization.trim())
      : cookieToken;
    if (!token) return res.status(401).json({ success: false, code: "AUTH_REQUIRED", message: "Authentication is required" });

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;
    req.authType = authorization ? "bearer" : "cookie";

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      code: "AUTH_INVALID",
      message: "Authentication token is invalid or expired",
    });
  }
};

module.exports = authMiddleware;
