const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
require('dotenv').config();

const asyncHandler = require('../utils/asyncHandler');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} = require('../utils/tokens.js');
const { sendConfirmationEmail } = require('../utils/email');
const { generateAvatars } = require('../utils/generators.js');

const Notification = require('../models/notificationModel');
const Following = require('../models/followingModel');
const Follower = require('../models/followerModel');
const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');

// @desc Auth user and get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, guest } = req.body;

  let userEmail = email;
  let userPassword = password;

  if (guest) {
    userEmail = process.env.GUEST_EMAIL;
    userPassword = process.env.GUEST_PASSWORD;
  }

  let user = await User.findOne({ email: userEmail });

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password.');
  }

  if (!user.isConfirmed && !guest && !user.isGuest) {
    sendConfirmationEmail(userEmail, user._id);
    res.status(401);
    throw new Error('Please confirm your email to login.');
  }

  if (!(await user.matchPassword(userPassword))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const followersData = await Follower.findOne({ user: user._id });
  const followingData = await Following.findOne({ user: user._id });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  sendRefreshToken(res, refreshToken);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin,
    isVerified: user.isVerified,
    followers: followersData?.followers || [],
    following: followingData?.following || [],
    bio: user.bio,
    image: user.image,
    cover: user.cover,
    accessToken: accessToken,
    isGuest: user.isGuest,
  });
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const createdUser = await User.create({
    name,
    email,
    password,
    image: generateAvatars(name),
  });

  // Generate a username from ID
  createdUser.username = createdUser._id.toString();
  await createdUser.save();

  sendConfirmationEmail(createdUser.email, createdUser._id);

  return res.status(201).json({ message: 'User Created successfully' });
});

// @desc Confirm user's email
// @route GET /api/users/confirmation/:token
// @access Public
const confirmUserEmail = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const { id } = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error('Invalid user ID.');
  }

  user.isConfirmed = true;
  await user.save();

  res.json({ message: `User's email is confirmed successfully.` });
});

// @desc Log out user
// @route POST /api/users/logout
// @access Public
const logOutUser = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken', { path: '/refresh_token' });

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.refreshToken = '';
  await user.save();

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc Refresh tokens
// @route POST /api/users/refresh_token
// @access Public
const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res
      .status(404)
      .send({ accessToken: '', message: 'No token found!' });
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.status(401).send({ accessToken: '', message: 'Invalid token!' });
  }
  const user = await User.findById(decoded.id);
  if (!user)
    return res
      .status(404)
      .send({ accessToken: '', message: 'User not found!' });
  if (user.refreshToken !== token) {
    return res
      .status(401)
      .send({ accessToken: '', message: "Tokens don't match!" });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save();

  const followersData = await Follower.findOne({ user: user._id });
  const followingData = await Following.findOne({ user: user._id });

  sendRefreshToken(res, refreshToken);
  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin,
    isGuest: user.isGuest,
    isVerified: user.isVerified,
    followers: followersData?.followers || [],
    following: followingData?.following || [],
    bio: user.bio,
    image: user.image,
    cover: user.cover,
    accessToken: accessToken,
  });
});

// @desc Get users list
// @route GET /api/users
// @access Private
const getUsersList = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // case insensitive
        },
      }
    : {};
  let users = await User.find({ ...keyword })
    .select('-password -email')
    .sort({ createdAt: -1 });

  res.json(users);
});

// @desc Edit user profile details
// @route PUT /api/users
// @access Private
const editUser = asyncHandler(async (req, res) => {
  let { id, name, username, bio, password, image, cover } = req.body;

  username = username.toLowerCase().replace(/\s+/g, '');

  if (username.length > 15) {
    res.status(401);
    throw new Error('Username should be 15 characters maximum.');
  }

  if (name.length > 20) {
    res.status(401);
    throw new Error('Name should be 20 characters maximum.');
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error('User Not Found');
  }

  const usernameExists = await User.findOne({ username: username });

  if (usernameExists && usernameExists._id.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error('Username already exists!');
  }

  let adminIsEditing = false;

  if (req.user._id.toString() !== id.toString() && req.user.isAdmin) {
    adminIsEditing = true;
  }

  if (req.user._id.toString() !== id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not Authorized, user id is different');
  }

  user.name = name || user.name;
  user.username = username || user.username;
  if (password) {
    user.password = password;
  }
  user.bio = bio || user.bio;
  user.image = image || user.image;
  user.cover = cover || user.cover;

  const updatedUser = await user.save();

  if (adminIsEditing) {
    const adminUser = await User.findById(req.user._id);

    res.json({
      _id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      username: adminUser.username,
      isAdmin: adminUser.isAdmin,
      isGuest: adminUser.isGuest,
      isVerified: adminUser.isVerified,
      bio: adminUser.bio,
      image: adminUser.image,
      cover: adminUser.cover,
      accessToken: generateAccessToken(adminUser._id),
    });
  } else {
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      username: updatedUser.username,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      isGuest: updatedUser.isGuest,
      isVerified: updatedUser.isVerified,
      image: updatedUser.image,
      cover: updatedUser.cover,
      bio: updatedUser.bio,
      accessToken: generateAccessToken(updatedUser._id),
    });
  }
});

// @desc Get User Profile
// @route GET /api/users/:id
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const username = req.params.id;

  const user = await User.findOne({ username: username });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  let isFollower = false;
  let isFollowed = false;

  const followerExist = await Follower.findOne({
    user: req.user._id,
    'followers.user': user._id,
  });

  const followingExist = await Following.findOne({
    user: req.user._id,
    'following.user': user._id,
  });

  if (followerExist) {
    isFollower = true;
  }
  if (followingExist) {
    isFollowed = true;
  }

  const followersData = await Follower.findOne({ user: user._id });
  const followingData = await Following.findOne({ user: user._id });

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    followers: followersData?.followers || [],
    following: followingData?.following || [],
    isAdmin: user.isAdmin,
    isVerified: user.isVerified,
    image: user.image,
    cover: user.cover,
    bio: user.bio,
    isFollower,
    isFollowed,
  };

  const tweets = await Tweet.find({ user: user._id })
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

  res.json({ user: userData, tweets });
});

// @desc Toogle follow and unfollow a user
// @route GET /api/users/follow/:id
// @access Private
const followUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve the logged-in user
    const user = await User.findById(req.user._id);
    // Check if the user is already followed
    const isFollowing = await Following.exists({
      user: req.user._id,
      'following.user': id,
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Prevent following self
    if (id.toString() === req.user._id.toString()) {
      res.status(400).json({ error: 'Cannot follow yourself' });
      return;
    }

    let action;

    if (isFollowing) {
      action = 'unfollow';
      // Unfollow user
      await Following.updateOne(
        { user: req.user._id },
        { $pull: { following: { user: ObjectId(id) } } }
      );
      await Follower.updateOne(
        { user: id },
        { $pull: { followers: { user: req.user._id } } }
      );
    } else {
      action = 'follow';
      // Follow user
      await Following.updateOne(
        { user: req.user._id },
        { $push: { following: { user: ObjectId(id) } } },
        { upsert: true }
      );
      await Follower.updateOne(
        { user: id },
        { $push: { followers: { user: req.user._id } } },
        { upsert: true }
      );
      // Create a notification for the followed user
      const notification = new Notification({
        receiver: id,
        sender: req.user._id,
        read: false,
        action: 'follow',
        message: 'followed you.',
        link: `/profile/${req.user.username}`,
      });
      await notification.save();
    }

    res.json({ message: `User ${action}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @desc Get recommended user
// @route GET /api/users/recommended
// @access Private
const getRecommendedUser = asyncHandler(async (req, res) => {
  const userSize = parseInt(process.env.RECOMMENDED_USERS_SIZE) || 3;

  let currentUser = await User.findById(req.user._id);
  let followingData = await Following.findOne({
    user: currentUser._id,
  });

  let followedUsers = followingData?.following || [];
  let friendArray = followedUsers.map((f) => f.user);

  let users = await User.find({
    _id: { $nin: [...friendArray, req.user._id] },
    isAdmin: false,
    isGuest: false,
  })
    .select('_id name username isVerified image')
    .limit(userSize);

  if (!users || users.length === 0) {
    res.status(404).json({ error: 'No recommended users found' });
    return;
  }

  res.json(users);
});

// @desc Verify a  user
// @route Get /api/user/verify/:id
// @access Private
const verifyUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error('User Not Found');
  }
  let msg = '';
  if (user.isVerified) {
    user.isVerified = false;
    msg = 'Unverified';
  } else {
    user.isVerified = true;
    msg = 'Verified';

    const notification = new Notification({
      receiver: user,
      sender: req.user._id,
      read: false,
      action: 'verified',
      message: 'verified you. Congrats!',
      link: `/profile`,
    });

    await notification.save();
  }

  await user.save();

  res.json({ message: `User is now ${msg}` });
});

// @desc Get notifications of a user
// @route Get /api/user/notifications
// @access Private
const getNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error('User Not Found');
  }

  await Notification.updateMany({ receiver: req.user._id }, { read: true });

  const notifications = await Notification.find({
    receiver: req.user._id,
  })
    .populate('sender', 'id name username image isAdmin isVerified')
    .sort({ createdAt: -1 });

  res.json(notifications);
});

// @desc Get UNREAD notifications of a user
// @route Get /api/user/unreadnotifications
// @access Private
const getUnreadNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error('User Not Found');
  }

  const count = await Notification.countDocuments({
    receiver: req.user._id,
    read: false,
  });

  res.json({ count });
});

module.exports = {
  loginUser,
  registerUser,
  logOutUser,
  refreshToken,
  getUserProfile,
  followUser,
  getRecommendedUser,
  editUser,
  verifyUser,
  getUsersList,
  getNotifications,
  getUnreadNotifications,
  confirmUserEmail,
};
