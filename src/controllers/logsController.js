const Logs = require("../database/models/logsModel");
async function getAllLogs(req, res, next) {
  try {
    const logs = await Logs.find();
    res.status(200).json(logs);
  } catch (e) {
    next({ status: 200, messgae: e.message });
  }
}

module.exports = {
  getAllLogs,
};
