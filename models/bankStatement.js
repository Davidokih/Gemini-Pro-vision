const mongoose = require("mongoose");

const bankStatementSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  statementData: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const BankStatement = mongoose.model("BankStatement", bankStatementSchema);

module.exports = BankStatement;
