const Logs = require("../database/models/logsModel");
const { DEFAULT_LOGS_PAGINATION } = require("../utils/enums");
async function getAllLogs(req, res, next) {
  const {
    page = DEFAULT_LOGS_PAGINATION.page,
    limit = DEFAULT_LOGS_PAGINATION.limit,
  } = req.body.pagination;
  try {
    const logs = await Logs.find()
      .skip(page * limit)
      .limit(limit);
    res.status(200).json(logs);
  } catch (e) {
    next({ status: 200, messgae: e.message });
  }
}

module.exports = {
  getAllLogs,
};
