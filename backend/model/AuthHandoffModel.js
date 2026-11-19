const { model } = require("mongoose");
const { AuthHandoffSchema } = require("../schemas/AuthHandoffSchema");

const AuthHandoffModel = model("AuthHandoff", AuthHandoffSchema);

module.exports = { AuthHandoffModel };
