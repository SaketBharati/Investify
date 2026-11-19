const {Schema}= require("mongoose");

const OrdersSchema = new Schema(
    {
      userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
    name: { type: String, required: true, trim: true, uppercase: true, maxlength: 24 },
    qty: { type: Number, required: true, min: 0, validate: Number.isFinite },
    price: { type: Number, required: true, min: 0, validate: Number.isFinite },
    mode: { type: String, required: true, enum: ["BUY", "SELL"] },
    idempotencyKey: { type: String, maxlength: 128 },
  },{
    timestamps: true,
  }
);

OrdersSchema.index({ userId:  1, createdAt: -1 });
OrdersSchema.index(
  { userId: 1, idempotencyKey: 1 },
  { unique: true, partialFilterExpression: { idempotencyKey: { $type: "string" } } },
);

module.exports= {OrdersSchema};
