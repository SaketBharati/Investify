const express = require("express");
const authMiddleware = require("../middleware/authmiddleware");
const { csrfMiddleware } = require("../middleware/csrfMiddleware");
const { HoldingsModel } = require("../model/HoldingsModel");
const { OrdersModel } = require("../model/OrdersModel");
const { UsersModel } = require("../model/UsersModel");
const { parsePositiveAmount, validIdempotencyKey, isTransactionUnsupported, areTransactionsSupported } = require("../utils/financialValidation");

const router = express.Router();
const validStockName = (name) => typeof name === "string" && /^[A-Z0-9&._-]{1,24}$/.test(name.trim().toUpperCase());

router.post("/newOrder", authMiddleware, csrfMiddleware, async (req, res) => {
  const { mode } = req.body || {};
  const name = typeof req.body?.name === "string" ? req.body.name.trim().toUpperCase() : "";
  const qty = parsePositiveAmount(req.body?.qty);
  const price = parsePositiveAmount(req.body?.price);
  const idempotencyKey = req.get("Idempotency-Key");
  if (!validStockName(name)) return res.status(400).json({ success: false, message: "Enter a valid stock symbol" });
  if (qty === null || price === null) return res.status(400).json({ success: false, message: "Quantity and price must be finite numbers greater than zero" });
  if (!Number.isSafeInteger(qty)) return res.status(400).json({ success: false, message: "Quantity must be a positive whole number" });
  if (mode !== "BUY" && mode !== "SELL") return res.status(400).json({ success: false, message: "Mode must be BUY or SELL" });
  if (!validIdempotencyKey(idempotencyKey)) return res.status(400).json({ success: false, message: "A valid Idempotency-Key header is required" });
  if (areTransactionsSupported() === false) return res.status(503).json({ success: false, message: "This database deployment does not support safe trading transactions. No trade was placed." });

  const session = await UsersModel.startSession();
  let result;
  try {
    await session.withTransaction(async () => {
      const existingOrder = await OrdersModel.findOne({ userId: req.user.id, idempotencyKey }).session(session);
      if (existingOrder) {
        if (existingOrder.name !== name || existingOrder.qty !== qty || existingOrder.price !== price || existingOrder.mode !== mode) {
          const conflict = new Error("Idempotency key was already used for a different order");
          conflict.statusCode = 409;
          throw conflict;
        }
        result = { order: existingOrder, replay: true };
        return;
      }

      const userExists = await UsersModel.exists({ _id: req.user.id }).session(session);
      if (!userExists) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      let holding;
      if (mode === "BUY") {
        const cost = qty * price;
        if (!Number.isFinite(cost) || cost <= 0) {
          const error = new Error("Order value is outside the supported range");
          error.statusCode = 400;
          throw error;
        }
        const updatedUser = await UsersModel.findOneAndUpdate(
          { _id: req.user.id, balance: { $gte: cost } },
          { $inc: { balance: -cost } },
          { new: true, session, runValidators: true },
        );
        if (!updatedUser) {
          const error = new Error("Insufficient balance");
          error.statusCode = 400;
          throw error;
        }
        holding = await HoldingsModel.findOne({ userId: req.user.id, name }).session(session);
        if (holding) {
          const nextQty = holding.qty + qty;
          holding.avg = (holding.avg * holding.qty + price * qty) / nextQty;
          holding.qty = nextQty;
          holding.price = price;
          await holding.save({ session });
        } else {
          [holding] = await HoldingsModel.create([{
            userId: req.user.id, name, qty, avg: price, price, net: "+0.00%", day: "+0.00%",
          }], { session });
        }
      } else {
        holding = await HoldingsModel.findOneAndUpdate(
          { userId: req.user.id, name, qty: { $gte: qty } },
          { $inc: { qty: -qty }, $set: { price } },
          { new: true, session, runValidators: true },
        );
        if (!holding) {
          const available = await HoldingsModel.findOne({ userId: req.user.id, name }).select("qty").session(session);
          const error = new Error(available ? `Only ${available.qty} shares available` : "You don't own this stock");
          error.statusCode = 400;
          throw error;
        }
        const proceeds = qty * price;
        if (!Number.isFinite(proceeds) || proceeds <= 0) {
          const error = new Error("Order value is outside the supported range");
          error.statusCode = 400;
          throw error;
        }
        const balanceUpdate = await UsersModel.updateOne(
          { _id: req.user.id, balance: { $lte: Number.MAX_VALUE - proceeds } },
          { $inc: { balance: proceeds } },
          { session },
        );
        if (!balanceUpdate.modifiedCount) {
          const error = new Error("Order proceeds exceed the supported balance range");
          error.statusCode = 400;
          throw error;
        }
        if (holding.qty === 0) await HoldingsModel.deleteOne({ _id: holding._id, userId: req.user.id }, { session });
      }

      const [order] = await OrdersModel.create([{
        userId: req.user.id, name, qty, price, mode, idempotencyKey,
      }], { session });
      result = { order, replay: false };
    });
  } catch (err) {
    if (err?.statusCode) return res.status(err.statusCode).json({ success: false, message: err.message });
    if (err?.code === 11000) {
      const prior = await OrdersModel.findOne({ userId: req.user.id, idempotencyKey }).lean();
      if (prior && prior.name === name && prior.qty === qty && prior.price === price && prior.mode === mode) {
        return res.status(200).json({ success: true, replayed: true, message: `${mode} order already placed`, order: prior });
      }
      if (prior) return res.status(409).json({ success: false, message: "Idempotency key was already used for a different order" });
    }
    if (isTransactionUnsupported(err)) {
      return res.status(503).json({ success: false, message: "This database deployment does not support safe trading transactions. No trade was placed." });
    }
    throw err;
  } finally {
    await session.endSession();
  }

  return res.status(result.replay ? 200 : 201).json({
    success: true,
    replayed: result.replay,
    message: result.replay ? `${mode} order already placed` : `${mode} order placed successfully`,
    order: result.order,
  });
});

router.get("/orders", authMiddleware, async (req, res) => {
  const orders = await OrdersModel.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
  return res.json(orders);
});

module.exports = router;
