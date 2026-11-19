const { Schema } = require("mongoose");

const UsersSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 1, maxlength: 40 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 254 },
  password: { type: String, required: true },
  balance: { type: Number, default: 100000, min: 0, validate: Number.isFinite },
});

module.exports = { UsersSchema };
