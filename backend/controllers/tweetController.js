const Tweet = require("../models/tweetModel");
const asyncHandler = require("express-async-handler");

// @desc Get all tweets
// @route DELETE /api/tweets
// @access Private
const getAllTweets = asyncHandler(async (req, res) => {
  const tweets = await Tweet.find({})
    .populate("user", "id name image")
    .sort({ createdAt: -1 });
  res.json(tweets);
});

// @desc Create a tweet
// @route POST /api/tweets
// @access Private
const createTweet = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { tweetContent } = req.body;
  const tweet = new Tweet({
    tweetContent,
    user: req.user._id,
    likes: 0,
    comments: [],
    numComments: 0,
  });
  const createdTweet = await tweet.save();
  res.status(201).json(createdTweet);
});

const deleteTweet = (req, res) => {
  Tweet.deleteOne({ _id: req.body.id }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  getAllTweets,
  createTweet,
  deleteTweet,
};
