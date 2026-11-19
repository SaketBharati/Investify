const { model } = require("mongoose");
const { FundsTransactionSchema } = require("../schemas/FundsTransactionSchema");

const FundsTransactionModel = model("FundsTransaction", FundsTransactionSchema);

module.exports = { FundsTransactionModel };
