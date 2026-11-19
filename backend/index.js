require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");
const holdingsRoutes = require("./Routes/HoldingRoutes");
const ordersRoutes = require("./Routes/ordersRoutes");
const fundsRoutes = require("./Routes/FundsRoutes");
const { setTransactionsSupported } = require("./utils/financialValidation");
const { parseCookies } = require("./middleware/csrfMiddleware");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsTransactionModel } = require("./model/FundsTransactionModel");
const { AuthHandoffModel } = require("./model/AuthHandoffModel");

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function validateEnvironment() {
  const missing = ["MONGO_URL", "JWT_SECRET"].filter(
    (name) => !process.env[name],
  );
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
  if (process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters.");
  }
  if (!new Set(["lax", "strict", "none"]).has((process.env.AUTH_COOKIE_SAME_SITE || "lax").toLowerCase())) {
    throw new Error("AUTH_COOKIE_SAME_SITE must be lax, strict, or none.");
  }
  if (process.env.NODE_ENV === "production" && allowedOrigins.length === 0) {
    throw new Error("CORS_ORIGINS must list the public app and dashboard origins in production.");
  }
}

app.disable("x-powered-by");
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (process.env.NODE_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS."));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Idempotency-Key", "X-CSRF-Token"],
    credentials: true,
  }),
);
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));
app.use((req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const origin = req.get("Origin");
  const localOrigin = process.env.NODE_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(origin || "");
  if (origin && !allowedOrigins.includes(origin) && !localOrigin) {
    return res.status(403).json({ success: false, message: "Origin is not allowed" });
  }
  const cookieToken = parseCookies(req.headers.cookie).investify_auth;
  if (cookieToken && !["/auth/logout", "/auth/exchange", "/auth/session", "/login", "/signup"].includes(req.path) && !req.get("X-CSRF-Token")) {
    return res.status(403).json({ success: false, code: "CSRF_INVALID", message: "Request could not be verified" });
  }
  return next();
});

app.get("/health", (_req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({ status: ready ? "ok" : "starting" });
});

app.use(authRoutes);
app.use(holdingsRoutes);
app.use(ordersRoutes);
app.use(fundsRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

app.use((err, _req, res, _next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON request body" });
  }
  if (err?.message === "Origin is not allowed by CORS.") {
    return res.status(403).json({ success: false, message: "Origin is not allowed" });
  }
  console.error("Unhandled API error:", err?.name || "Error", err?.code || "");
  return res.status(500).json({ success: false, message: "Internal server error" });
});

let server;
let shuttingDown = false;

async function start() {
  validateEnvironment();
  await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 10000, socketTimeoutMS: 45000 });
  await Promise.all([OrdersModel.init(), FundsTransactionModel.init(), AuthHandoffModel.init()]);
  const hello = await mongoose.connection.db.admin().command({ hello: 1 });
  const supportsTransactions = Boolean(hello.setName || hello.msg === "isdbgrid");
  setTransactionsSupported(supportsTransactions);
  console.log(supportsTransactions
    ? "MongoDB topology supports multi-document transactions."
    : "MongoDB topology does not support transactions; financial writes will fail closed.");
  server = app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
}

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`Received ${signal}; shutting down.`);
  if (server) await new Promise((resolve) => server.close(resolve));
  await mongoose.disconnect();
  process.exit(0);
}

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));

if (require.main === module) {
  start().catch(async (err) => {
    console.error("API startup failed:", err?.name || "Error", err?.code || "");
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  });
}

module.exports = { app, validateEnvironment };
