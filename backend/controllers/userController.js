const User = require("../models/userModel");
const Tweet = require("../models/tweetModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");

// @desc Auth user and get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      friends: user.friends,
      image: user.image,
      cover: user.cover,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    friends: [],
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      friends: user.friends,
      isAdmin: user.isAdmin,
      image: user.image,
      cover: user.cover,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Get User Profile
// @route GET /api/users/:id
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const friend = await User.find({
    _id: req.user._id,
    "friends.user": id,
  });
  let isFriend = false;
  if (friend && friend.length > 0) {
    isFriend = true;
  }
  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    friends: user.friends,
    isAdmin: user.isAdmin,
    image: user.image,
    cover: user.cover,
    bio: user.bio,
    isFriend,
  };
  const tweets = await Tweet.find({ user: id })
    .populate("user", "id name image")
    .sort({ createdAt: -1 });
  res.json({ user: userData, tweets });
});

// @desc Add friend
// @route GET /api/users/friends/:id
// @access Private
const addFriend = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (id.toString() === req.user._id.toString()) {
    throw new Error("Cannot add yourself in your friendlist");
  }
  const userExist = user.friends.find(
    (f) => f.user.toString() === id.toString()
  );
  if (!userExist) {
    user.friends.push({ user: id });
  } else {
    user.friends = user.friends.filter(
      (f) => f.user.toString() !== userExist.user.toString()
    );
  }
  await user.save();
  res.json("User added to friendlist");
});

// @desc Get recommended user
// @route GET /api/users/recommended
// @access Private
const getRecommendedUser = asyncHandler(async (req, res) => {
  const userSize = 3;
  let currentUser = await User.findById(req.user._id);
  let friendArray = currentUser.friends.map((f) => f.user);
  let users = await User.find({
    _id: { $nin: [...friendArray, req.user._id] },
  }).limit(userSize);
  if (!users) {
    res.status(404);
    throw new Error("No recommended users found");
  }

  users = users.map((u) => {
    let isFriend = false;
    currentUser.friends.forEach((f) => {
      if (f.user.toString() === u._id.toString()) {
        return (isFriend = true);
      } else {
        return;
      }
    });
    return { ...u._doc, isFriend };
  });
  res.json(users);
});

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  addFriend,
  getRecommendedUser,
};
