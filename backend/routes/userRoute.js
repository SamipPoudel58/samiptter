const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProfile,
  addFriend,
  getRecommendedUser,
  editUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).put(protect, editUser);
router.post("/login", loginUser);
router.route("/friends/:id").get(protect, addFriend);
router.route("/recommended").get(protect, getRecommendedUser);
router.route("/:id").get(protect, getUserProfile);

module.exports = router;
