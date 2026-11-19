const express = require("express");
const authMiddleware = require("../middleware/authmiddleware");
const { csrfMiddleware } = require("../middleware/csrfMiddleware");
const { UsersModel } = require("../model/UsersModel");
const { OrdersModel } = require("../model/OrdersModel");
const { FundsTransactionModel } = require("../model/FundsTransactionModel");
const { parsePositiveAmount, validIdempotencyKey, isTransactionUnsupported, areTransactionsSupported } = require("../utils/financialValidation");

const router = express.Router();

router.get("/addPositions", authMiddleware, async (req, res) => {
  const positions = await OrdersModel.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
  return res.json(positions);
});

router.get("/balance", authMiddleware, async (req, res) => {
  const user = await UsersModel.findById(req.user.id).select("balance").lean();
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  return res.json({ success: true, balance: user.balance });
});

async function changeFunds(req, res, type) {
  const amount = parsePositiveAmount(req.body?.amount);
  const idempotencyKey = req.get("Idempotency-Key");
  if (amount === null) return res.status(400).json({ success: false, message: "Amount must be a finite number greater than zero" });
  if (!validIdempotencyKey(idempotencyKey)) return res.status(400).json({ success: false, message: "A valid Idempotency-Key header is required" });
  if (areTransactionsSupported() === false) return res.status(503).json({ success: false, message: "This database deployment does not support safe financial transactions. No balance was changed." });

  const session = await UsersModel.startSession();
  let response;
  try {
    await session.withTransaction(async () => {
      const prior = await FundsTransactionModel.findOne({ userId: req.user.id, idempotencyKey }).session(session);
      if (prior) {
        if (prior.type !== type || prior.amount !== amount) {
          const conflict = new Error("Idempotency key was already used for a different request");
          conflict.statusCode = 409;
          throw conflict;
        }
        const currentUser = await UsersModel.findById(req.user.id).select("balance").session(session);
        response = { replay: true, balance: currentUser?.balance ?? prior.balanceAfter };
        return;
      }

      const update = type === "DEPOSIT"
        ? { $inc: { balance: amount } }
        : { $inc: { balance: -amount } };
      const filter = type === "DEPOSIT"
        ? { _id: req.user.id, balance: { $lte: Number.MAX_VALUE - amount } }
        : { _id: req.user.id, balance: { $gte: amount } };
      const user = await UsersModel.findOneAndUpdate(filter, update, { new: true, session, runValidators: true }).select("balance");
      if (!user) {
        const existingUser = await UsersModel.findById(req.user.id).select("balance").session(session);
        const exists = Boolean(existingUser);
        const message = !exists
          ? "User not found"
          : type === "DEPOSIT" && existingUser.balance > Number.MAX_VALUE - amount
            ? "Amount exceeds the supported balance range"
            : "Insufficient balance";
        const error = new Error(message);
        error.statusCode = exists ? 400 : 404;
        throw error;
      }

      await FundsTransactionModel.create([{
        userId: req.user.id,
        idempotencyKey,
        type,
        amount,
        balanceAfter: user.balance,
      }], { session });
      response = { replay: false, balance: user.balance };
    });
  } catch (err) {
    if (err?.statusCode) return res.status(err.statusCode).json({ success: false, message: err.message });
    if (err?.code === 11000) {
      const prior = await FundsTransactionModel.findOne({ userId: req.user.id, idempotencyKey }).lean();
      if (prior && prior.type === type && prior.amount === amount) {
        const currentUser = await UsersModel.findById(req.user.id).select("balance").lean();
        return res.json({ success: true, balance: currentUser?.balance ?? prior.balanceAfter, message: type === "DEPOSIT" ? "Funds added successfully" : "Funds withdrawn successfully", replayed: true });
      }
      if (prior) return res.status(409).json({ success: false, message: "Idempotency key was already used for a different request" });
    }
    if (isTransactionUnsupported(err)) {
      return res.status(503).json({ success: false, message: "This database deployment does not support safe financial transactions. No balance was changed." });
    }
    throw err;
  } finally {
    await session.endSession();
  }

  return res.json({
    success: true,
    balance: response.balance,
    message: type === "DEPOSIT" ? "Funds added successfully" : "Funds withdrawn successfully",
    ...(response.replay ? { replayed: true } : {}),
  });
}

router.post("/addFunds", authMiddleware, csrfMiddleware, (req, res) => changeFunds(req, res, "DEPOSIT"));
router.post("/withdrawFunds", authMiddleware, csrfMiddleware, (req, res) => changeFunds(req, res, "WITHDRAWAL"));

module.exports = router;
