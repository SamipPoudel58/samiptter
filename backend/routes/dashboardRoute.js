const express = require("express");
const { dashBoardData } = require("../controllers/dashboardController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, admin, dashBoardData);

module.exports = router;
