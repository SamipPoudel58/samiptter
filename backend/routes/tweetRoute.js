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
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllTweets).post(protect, createTweet);

router
  .route('/:id')
  .get(protect, getTweetById)
  .post(protect, createComment)
  .put(protect, editTweet)
  .delete(protect, deleteTweet);
router.route('/:id/like').get(protect, likeTweet);

router
  .route('/:id/:comId')
  .get(protect, likeComment)
  .delete(protect, deleteComment);

module.exports = router;
