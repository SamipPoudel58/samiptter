const express = require("express");
const router = express.Router();
const {
  getAllTweets,
  createTweet,
  deleteTweet,
  getTweetById,
  likeTweet,
  likeComment,
} = require("../controllers/tweetController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllTweets).post(protect, createTweet);

router.route("/:id/like").get(protect, likeTweet);

router.route("/:id").get(protect, getTweetById);
router.route("/:id/:comId/like").get(protect, likeComment);

module.exports = router;
