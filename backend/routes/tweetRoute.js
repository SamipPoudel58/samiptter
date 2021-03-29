const express = require("express");
const router = express.Router();
const {
  getAllTweets,
  createTweet,
  deleteTweet,
} = require("../controllers/tweetController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getAllTweets)
  .post(protect, createTweet)
  .delete(protect, deleteTweet);

module.exports = router;
