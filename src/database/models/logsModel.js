const mongoose = require("mongoose");

const logsSchema = mongoose.Schema({
  type: String,
  action: String,
  status: String,
  error: String,
  createdAt: Date,
});

module.exports = mongoose.model("Logs", logsSchema);
