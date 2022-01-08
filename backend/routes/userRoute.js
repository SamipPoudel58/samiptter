const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProfile,
  getRecommendedUser,
  editUser,
  verifyUser,
  getUsersList,
  getNotifications,
  getUnreadNotifications,
  followUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getUsersList)
  .post(registerUser)
  .put(protect, editUser);
router.post("/login", loginUser);
router.route("/notifications").get(protect, getNotifications);
router.route("/unreadnotifications").get(protect, getUnreadNotifications);
router.route("/follow/:id").get(protect, followUser);
// router.route("/follow/:id").get(protect, followUser);
router.route("/recommended").get(protect, getRecommendedUser);
router.route("/:id").get(protect, getUserProfile);
router.route("/verify/:id").get(protect, verifyUser);

module.exports = router;
