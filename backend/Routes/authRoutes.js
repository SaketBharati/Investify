const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authMiddleware = require("../middleware/authmiddleware");
const rateLimit = require("../middleware/rateLimit");
const { csrfMiddleware } = require("../middleware/csrfMiddleware");
const { UsersModel } = require("../model/UsersModel");
const { AuthHandoffModel } = require("../model/AuthHandoffModel");

const router = express.Router();
const authRateLimit = rateLimit({ limit: 10 });
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cookieSameSite = (process.env.AUTH_COOKIE_SAME_SITE || "lax").toLowerCase();
const cookieSecure = process.env.NODE_ENV === "production";
const authCookieOptions = { httpOnly: true, secure: cookieSecure, sameSite: cookieSameSite, path: "/", maxAge: 7 * 24 * 60 * 60 * 1000 };
const csrfCookieOptions = { httpOnly: false, secure: cookieSecure, sameSite: cookieSameSite, path: "/", maxAge: 7 * 24 * 60 * 60 * 1000 };

function safeUser(user) {
  return { id: user._id, username: user.username, email: user.email };
}

async function issueHandoff(user) {
  const code = crypto.randomBytes(32).toString("base64url");
  const codeHash = crypto.createHash("sha256").update(code).digest("hex");
  await AuthHandoffModel.create({
    codeHash,
    userId: user._id,
    expiresAt: new Date(Date.now() + 60 * 1000),
  });
  return code;
}

function validCredentials({ username, email, password }, signup = false) {
  if (typeof email !== "string" || !emailPattern.test(email.trim()) || email.length > 254) return false;
  if (typeof password !== "string" || !password.length || password.length > (signup ? 128 : 1024) || (signup && password.length < 8)) return false;
  if (signup && (typeof username !== "string" || !username.trim() || username.trim().length > 40)) return false;
  return true;
}

function escapedRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.post("/signup", authRateLimit, async (req, res) => {
  if (!validCredentials(req.body || {}, true)) {
    return res.status(400).json({ success: false, message: "Enter a valid username, email, and password (at least 8 characters)." });
  }
  const username = req.body.username.trim();
  const email = req.body.email.trim().toLowerCase();
  try {
    const existingUser = await UsersModel.findOne({ $or: [{ email: { $regex: `^${escapedRegex(email)}$`, $options: "i" } }, { username }] });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email or username is already registered" });
    }
    const user = await UsersModel.create({
      username,
      email,
      password: await bcrypt.hash(req.body.password, 12),
    });
    return res.status(201).json({ success: true, message: "User created successfully", handoffCode: await issueHandoff(user), user: safeUser(user) });
  } catch (err) {
    if (err?.code === 11000) return res.status(409).json({ success: false, message: "Email or username is already registered" });
    throw err;
  }
});

router.post("/login", authRateLimit, async (req, res) => {
  if (!validCredentials(req.body || {})) {
    return res.status(400).json({ success: false, message: "Enter a valid email and password." });
  }
  const user = await UsersModel.findOne({ email: { $regex: `^${escapedRegex(req.body.email.trim())}$`, $options: "i" } });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }
  return res.json({ success: true, message: "Login successful", handoffCode: await issueHandoff(user), user: safeUser(user) });
});

router.post("/auth/exchange", async (req, res) => {
  const code = req.body?.code;
  if (typeof code !== "string" || code.length < 40 || code.length > 100) {
    return res.status(400).json({ success: false, message: "Invalid or expired sign-in code" });
  }
  const codeHash = crypto.createHash("sha256").update(code).digest("hex");
  const handoff = await AuthHandoffModel.findOneAndDelete({ codeHash, expiresAt: { $gt: new Date() } });
  if (!handoff) return res.status(401).json({ success: false, message: "Sign-in code is invalid or expired. Please sign in again." });
  const user = await UsersModel.findById(handoff.userId);
  if (!user) return res.status(401).json({ success: false, message: "Account is unavailable. Please sign in again." });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  const csrfToken = crypto.randomBytes(32).toString("base64url");
  res.cookie("investify_auth", token, authCookieOptions);
  res.cookie("investify_csrf", csrfToken, csrfCookieOptions);
  return res.json({ success: true, csrfToken, user: safeUser(user) });
});

router.post("/auth/session", authMiddleware, async (req, res) => {
  const user = await UsersModel.findById(req.user.id);
  if (!user) return res.status(401).json({ success: false, message: "Account is unavailable. Please sign in again." });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  const csrfToken = crypto.randomBytes(32).toString("base64url");
  res.cookie("investify_auth", token, authCookieOptions);
  res.cookie("investify_csrf", csrfToken, csrfCookieOptions);
  return res.json({ success: true, csrfToken, user: safeUser(user) });
});

router.get("/auth/csrf", authMiddleware, (req, res) => {
  const csrfToken = crypto.randomBytes(32).toString("base64url");
  res.cookie("investify_csrf", csrfToken, csrfCookieOptions);
  return res.json({ success: true, csrfToken });
});

router.post("/auth/logout", (req, res) => {
  const { maxAge: _authMaxAge, ...authClearOptions } = authCookieOptions;
  const { maxAge: _csrfMaxAge, ...csrfClearOptions } = csrfCookieOptions;
  res.clearCookie("investify_auth", authClearOptions);
  res.clearCookie("investify_csrf", csrfClearOptions);
  return res.json({ success: true, message: "Logged out" });
});

router.get("/profile", authMiddleware, async (req, res) => {
  const user = await UsersModel.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  return res.json({ success: true, user });
});

module.exports = router;
