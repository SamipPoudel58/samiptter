const express = require('express');
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
  refreshToken,
  logOutUser,
  confirmUserEmail,
} = require('../controllers/userController');
const { protect, notGuest } = require('../middleware/authMiddleware');
const {
  validateUserRegisterData,
} = require('../middleware/validationMiddleware');

router
  .route('/')
  .get(protect, getUsersList)
  .post(validateUserRegisterData, registerUser)
  .put(protect, notGuest, editUser);
router.post('/login', loginUser);
router.route('/confirmation/:token').get(confirmUserEmail);
router.post('/logout', protect, logOutUser);
router.route('/notifications').get(protect, getNotifications);
router.route('/unreadnotifications').get(protect, getUnreadNotifications);
router.route('/follow/:id').get(protect, followUser);
router.route('/recommended').get(protect, getRecommendedUser);
router.route('/:id').get(protect, getUserProfile);
router.route('/verify/:id').get(protect, verifyUser);
router.route('/refresh_token').post(refreshToken);

module.exports = router;
