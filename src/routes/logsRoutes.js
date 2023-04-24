const express = require("express");
const { getAllLogs } = require("../controllers/logsController");

const router = express.Router();

router.get("/", getAllLogs);

module.exports = router;
