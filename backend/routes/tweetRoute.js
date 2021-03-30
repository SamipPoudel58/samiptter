const express = require("express");
const router = express.Router();
const {
  getAllTweets,
  createTweet,
  deleteTweet,
  likeTweet,
} = require("../controllers/tweetController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllTweets).post(protect, createTweet);

router.route("/:id/like").get(protect, likeTweet);

module.exports = router;
