const express = require('express');
const router = express.Router();
const {
  getAllTweets,
  createTweet,
  deleteTweet,
  getTweetById,
  likeTweet,
  likeComment,
  createComment,
  deleteComment,
  editTweet,
} = require('../controllers/tweetController');
const { protect, notGuest } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getAllTweets)
  .post(protect, notGuest, createTweet);

router
  .route('/:id')
  .get(protect, getTweetById)
  .post(protect, notGuest, createComment)
  .put(protect, notGuest, editTweet)
  .delete(protect, notGuest, deleteTweet);
router.route('/:id/like,').get(protect, likeTweet);

router
  .route('/:id/:comId')
  .get(protect, likeComment)
  .delete(protect, notGuest, deleteComment);

module.exports = router;
