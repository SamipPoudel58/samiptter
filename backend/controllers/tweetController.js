const Tweet = require("../models/tweetModel");
const asyncHandler = require("express-async-handler");
const io = require("../socket");

// @desc Get all tweets
// @route DELETE /api/tweets
// @access Private
const getAllTweets = asyncHandler(async (req, res) => {
  let tweets = await Tweet.find({})
    .populate("user", "id name image")
    .sort({ createdAt: -1 });

  const tweetsLikedByUser = await Tweet.find(
    {
      "likes.user": req.user._id,
    },
    "_id"
  );
  // let myTweets = [];
  // tweets.forEach((tweet) => {
  //   myTweets.push({ ...tweet._doc, isLiked: false });
  // });

  // myTweets.forEach((tweet) => {
  //   tweetsLikedByUser.forEach((t) => {
  //     if (t._id.toString() === tweet._id.toString()) {
  //       tweet.isLiked = true;
  //     }
  //   });
  // });

  tweets.forEach((tweet) => {
    tweetsLikedByUser.forEach((t) => {
      if (t._id.toString() === tweet._id.toString()) {
        tweet.isLiked = true;
      }
    });
  });

  // console.log(myTweets);
  res.json(tweets);
  // res.json(tweets);
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
    likes: [],
    comments: [],
    numComments: 0,
  });
  const createdTweet = await tweet.save();
  io.getIO().emit("tweets", { action: "create", tweet: createdTweet });
  res.status(201).json(createdTweet);
});

const likeTweet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findById(id);
  let task = "";
  // console.log(req.user);
  if (tweet) {
    const alreadyLiked = tweet.likes.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      tweet.likes = tweet.likes.filter(
        (r) => r.user.toString() !== req.user._id.toString()
      );
      tweet.numLikes = tweet.likes.length;
      task = "Unliked";
    } else {
      tweet.likes.push({ user: req.user._id });
      tweet.numLikes = tweet.likes.length;
      task = "Liked";
    }
  }

  await tweet.save();
  res.status(201).json({ message: `${task} the post` });
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
  likeTweet,
};
