
const {Schema} = require("mongoose");

const HoldingsSchema = new Schema({
    userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
    name: { type: String, required: true, trim: true, uppercase: true, maxlength: 24 },
    qty: { type: Number, required: true, min: 0, validate: Number.isFinite },
    avg: { type: Number, required: true, min: 0, validate: Number.isFinite },
    price: { type: Number, required: true, min: 0, validate: Number.isFinite },
    net: String,
    day: String,
  
});

HoldingsSchema.index({ userId: 1, name: 1 });

module.exports =   {HoldingsSchema};
