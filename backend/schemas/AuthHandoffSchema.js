const { Schema } = require("mongoose");

const AuthHandoffSchema = new Schema({
  codeHash: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  expiresAt: { type: Date, required: true, expires: 0 },
});

module.exports = { AuthHandoffSchema };
