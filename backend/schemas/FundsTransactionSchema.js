const { Schema } = require("mongoose");

const FundsTransactionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    idempotencyKey: { type: String, required: true, maxlength: 128 },
    type: { type: String, required: true, enum: ["DEPOSIT", "WITHDRAWAL"] },
    amount: { type: Number, required: true, min: 0, validate: Number.isFinite },
    balanceAfter: { type: Number, required: true, min: 0, validate: Number.isFinite },
  },
  { timestamps: true },
);

FundsTransactionSchema.index({ userId: 1, idempotencyKey: 1 }, { unique: true });

module.exports = { FundsTransactionSchema };
