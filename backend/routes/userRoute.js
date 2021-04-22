const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProfile,
  addFriend,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.route("/friends/:id").get(protect, addFriend);
router.route("/:id").get(protect, getUserProfile);

module.exports = router;
