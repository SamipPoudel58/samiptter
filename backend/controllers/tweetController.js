const Tweet = require("../models/tweetModel");
const asyncHandler = require("express-async-handler");

// @desc Get all tweets
// @route DELETE /api/tweets
// @access Private
const getAllTweets = asyncHandler(async (req, res) => {
  const tweets = await Tweet.find({}).populate("user", "id name image");

  res.json(tweets);
});

const createTweet = (req, res) => {
  const { name, userId, tweetContent } = req.body;
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  month = month <= 9 ? `0${month}` : month;
  let day = new Date().getDate();
  day = day <= 9 ? `0${day}` : day;
  let date = `${year}/${month}/${day}`;
  let time = `${new Date().getHours()}:${new Date().getMinutes()}`;

  if (tweetContent !== "") {
    const tweet = new Tweet({
      name: name,
      userId: userId,
      date: date,
      time: time,
      tweetContent: tweetContent,
    });
    tweet.save();
    res.json({
      name: name,
      userId: userId,
      date: date,
      time: time,
      tweetContent: tweetContent,
    });
  } else {
    res.status(400).json("Tweet is empty");
  }
};

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
