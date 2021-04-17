const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.route("/").post(registerUser);
router.route("/:id").get(protect, getUserProfile);

module.exports = router;
