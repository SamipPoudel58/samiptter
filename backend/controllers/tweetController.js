const Tweet = require('../models/tweetModel');
const asyncHandler = require('../utils/asyncHandler');
const io = require('../socket');
const Notification = require('../models/notificationModel');
const { purifyXSS } = require('../utils/purifyXSS');
const User = require('../models/userModel');

// @desc Get all tweets
// @route GET /api/tweets
// @access Private
const getAllTweets = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        tweetContent: {
          $regex: req.query.keyword,
          $options: 'i', // case insensitive
        },
      }
    : {};

  const count = await Tweet.countDocuments({ ...keyword });
  let tweets = await Tweet.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('user', 'id name username image isAdmin isVerified')
    .sort({ createdAt: -1 });

  const tweetsLikedByUser = await Tweet.find(
    {
      'likes.user': req.user._id,
    },
    '_id'
  );

  tweets.forEach((tweet) => {
    tweetsLikedByUser.forEach((t) => {
      if (t._id.toString() === tweet._id.toString()) {
        tweet.isLiked = true;
      }
    });
  });

  res.json({ tweets, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single tweet
// @route GET /api/tweets/:id
// @access Private
const getTweetById = asyncHandler(async (req, res) => {
  let tweet = await Tweet.findById(req.params.id)
    .populate('user', 'id name username image isAdmin isVerified')
    .populate('comments.user', 'id name username image isAdmin isVerified');
  if (tweet) {
    const tweetsLikedByUser = await Tweet.find(
      {
        'likes.user': req.user._id,
      },
      '_id'
    );

    tweetsLikedByUser.forEach((t) => {
      if (t._id.toString() === tweet._id.toString()) {
        tweet.isLiked = true;
      }
    });

    tweet.comments.forEach((com) => {
      com.likes.forEach((u) => {
        if (u.user._id.toString() === req.user._id.toString()) {
          com.isLiked = true;
        }
      });
    });
    res.json(tweet);
  } else {
    res.status(404);
    throw new Error('Tweet not found');
  }
});

// @desc Create a tweet
// @route POST /api/tweets
// @access Private
const createTweet = asyncHandler(async (req, res) => {
  let { tweetContent, images } = req.body;

  tweetContent = purifyXSS(tweetContent);

  const tweet = new Tweet({
    tweetContent,
    images,
    user: req.user._id,
    likes: [],
    isEdited: false,
    comments: [],
    numComments: 0,
  });
  const createdTweet = await tweet.save();

  let usernames = tweetContent.match(/@[a-z0-9_]*/g) || [];
  usernames = usernames
    .map(function (x) {
      return x.replace('@', '');
    })
    .filter(function (x) {
      return !!x;
    });

  if (usernames.length > 0) {
    for (let mentionedUser of usernames) {
      try {
        const user = await User.findOne({ username: mentionedUser });

        if (!user) {
          console.log('Mentioned user not found');
          continue;
        }
        const notification = new Notification({
          receiver: user._id,
          sender: req.user._id,
          read: false,
          action: 'mention',
          message: 'mentioned you in a post.',
          link: `/tweets/${createdTweet._id}`,
        });
        await notification.save();
      } catch (err) {
        console.log(err);
      }
    }
  }

  io.getIO().emit('tweets', { action: 'create', tweet: createdTweet });
  res.status(201).json(createdTweet);
});

// @desc Edit a tweet
// @route PUT /api/tweets
// @access Private
const editTweet = asyncHandler(async (req, res) => {
  let { tweetContent, images } = req.body;
  const id = req.params.id;

  tweetContent = purifyXSS(tweetContent);

  const tweet = await Tweet.findById(id);

  if (!tweet) return res.status(404).json({ message: 'Tweet not found' });

  if (tweet.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('UnAuthorized User of the tweet');
  }

  tweet.tweetContent = tweetContent;
  tweet.images = images;
  tweet.isEdited = true;
  const updatedTweet = await tweet.save();

  let usernames = tweetContent.match(/@[a-z0-9_]*/g) || [];
  usernames = usernames
    .map(function (x) {
      return x.replace('@', '');
    })
    .filter(function (x) {
      return !!x;
    });

  if (usernames.length > 0) {
    for (let mentionedUser of usernames) {
      try {
        const user = await User.findOne({ username: mentionedUser });

        if (!user) {
          console.log('Mentioned user not found');
          continue;
        }
        const notification = new Notification({
          receiver: user._id,
          sender: req.user._id,
          read: false,
          action: 'mention',
          message: 'mentioned you in a post.',
          link: `/tweets/${updatedTweet._id}`,
        });
        await notification.save();
      } catch (err) {
        console.log(err);
      }
    }
  }
  res.status(201).json(updatedTweet);
});

// @desc Like a tweet
// @route POST /api/tweets/:id/like
// @access Private
const likeTweet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findById(id);

  let task = '';
  if (!tweet) {
    res.status(404);
    throw new Error('Tweet not found');
  }

  const alreadyLiked = tweet.likes.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyLiked) {
    tweet.likes = tweet.likes.filter(
      (r) => r.user.toString() !== req.user._id.toString()
    );
    tweet.numLikes = tweet.likes.length;
    task = 'Unliked';
  } else {
    tweet.likes.push({ user: req.user._id });
    tweet.numLikes = tweet.likes.length;
    task = 'Liked';

    if (tweet.user.toString() !== req.user._id.toString()) {
      const notification = new Notification({
        receiver: tweet.user,
        sender: req.user._id,
        read: false,
        action: 'like',
        message: 'liked your post.',
        link: `/tweets/${tweet._id}`,
      });

      await notification.save();
    }
  }

  await tweet.save();

  res.status(201).json({ message: `${task} the post` });
});

// @desc Like a comment
// @route POST /api/tweets/:id/:comId/like
// @access Private
const likeComment = asyncHandler(async (req, res) => {
  const { id, comId } = req.params;
  const tweet = await Tweet.findById(id);
  let task = '';
  if (!tweet) {
    res.status(404);
    throw new Error('Tweet not found');
  }
  tweet.comments.forEach(async (com) => {
    if (com._id.toString() === comId.toString()) {
      const alreadyLiked = com.likes.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyLiked) {
        com.likes = com.likes.filter(
          (r) => r.user.toString() !== req.user._id.toString()
        );
        com.numLikes = com.likes.length;
        task = 'Unliked';
      } else {
        com.likes.push({ user: req.user._id });
        com.numLikes = com.likes.length;
        task = 'Liked';

        if (com.user.toString() !== req.user._id.toString()) {
          const notification = new Notification({
            receiver: com.user,
            sender: req.user._id,
            read: false,
            action: 'like',
            message: 'liked your comment.',
            link: `/tweets/${tweet._id}`,
          });

          await notification.save();
        }
      }
    }
  });
  await tweet.save();

  res.status(201).json({ message: `${task} the comment` });
});

// @desc Create a comment
// @route POST /api/tweets/:id
// @access Private
const createComment = asyncHandler(async (req, res) => {
  let { commentContent } = req.body;

  commentContent = purifyXSS(commentContent);
  const { id } = req.params;
  const tweet = await Tweet.findById(id);

  if (!tweet) {
    res.status(404);
    throw new Error('Tweet not found');
  }

  tweet.comments.push({
    user: req.user._id,
    likes: [],
    numLikes: 0,
    isLiked: false,
    tweetContent: commentContent,
  });
  tweet.numComments = tweet.comments.length;
  const createdTweet = await tweet.save();

  if (tweet.user.toString() !== req.user._id.toString()) {
    const notification = new Notification({
      receiver: tweet.user,
      sender: req.user._id,
      read: false,
      action: 'comment',
      message: 'commented on your post.',
      link: `/tweets/${tweet._id}`,
    });

    await notification.save();
  }

  let usernames = commentContent.match(/@[a-z0-9_]*/g) || [];
  usernames = usernames
    .map(function (x) {
      return x.replace('@', '');
    })
    .filter(function (x) {
      return !!x;
    });

  if (usernames.length > 0) {
    for (let mentionedUser of usernames) {
      try {
        const user = await User.findOne({ username: mentionedUser });

        if (!user || user._id.toString() === tweet.user.toString()) {
          console.log('Mentioned user not found');
          continue;
        }
        const notification = new Notification({
          receiver: user._id,
          sender: req.user._id,
          read: false,
          action: 'mention',
          message: 'mentioned you in a comment.',
          link: `/tweets/${tweet._id}`,
        });
        await notification.save();
      } catch (err) {
        console.log(err);
      }
    }
  }

  io.getIO().emit('tweets', { action: 'comment', tweet: createdTweet });
  res.status(201).json('Comment Created');
});

// @desc Delete a comment
// @route DEL /api/tweets/:id/:comId
// @access Private
const deleteComment = asyncHandler(async (req, res) => {
  const { id, comId } = req.params;
  const tweet = await Tweet.findById(id);
  // let task = "";
  if (!tweet) {
    res.status(404);
    throw new Error('Tweet not found');
  }

  tweet.comments = tweet.comments.filter((com) => {
    return com._id.toString() !== comId.toString();
  });
  tweet.numComments = tweet.comments.length;
  await tweet.save();
  // io.getIO().emit("tweets", { action: "comment" });
  res.status(201).json({ message: `Deleted the comment` });
});

// @desc Delete a tweet
// @route DEL /api/tweets/:id
// @access Private
const deleteTweet = asyncHandler(async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  if (!tweet) {
    res.status(404);
    throw new Error('Tweet not found');
  }
  if (tweet.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error('UnAuthorized User of the tweet');
  }
  await tweet.remove();
  res.json({ message: 'tweet deleted' });
});

module.exports = {
  getAllTweets,
  createTweet,
  editTweet,
  deleteTweet,
  likeTweet,
  createComment,
  deleteComment,
  likeComment,
  getTweetById,
};
