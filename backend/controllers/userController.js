const User = require("../models/userModel");
const Tweet = require("../models/tweetModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const { update } = require("../models/userModel");

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
      isVerified: user.isVerified,
      friends: user.friends,
      bio: user.bio,
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
      isVerified: user.isVerified,
      bio: user.bio,
      image: user.image,
      cover: user.cover,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Edit user profile details
// @route PUT /api/users
// @access Private
const editUser = asyncHandler(async (req, res) => {
  const { id, name, bio, password, image, cover } = req.body;
  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }

  let adminIsEditing = false;

  if (req.user._id.toString() !== id.toString() && req.user.isAdmin) {
    adminIsEditing = true;
  }

  if (req.user._id.toString() !== id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error("Not Authorized, user id is different");
  }

  user.name = name || user.name;
  if (password) {
    user.password = password;
  }
  user.bio = bio || user.bio;
  user.image = image || user.image;
  user.cover = cover || user.cover;

  const updatedUser = await user.save();

  if (adminIsEditing) {
    const adminUser = await User.findById(req.user._id);
    console.log(adminUser);
    res.json({
      _id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      isAdmin: adminUser.isAdmin,
      isVerified: adminUser.isVerified,
      friends: adminUser.friends,
      bio: adminUser.bio,
      image: adminUser.image,
      cover: adminUser.cover,
      token: generateToken(adminUser._id),
    });
  } else {
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified,
      image: updatedUser.image,
      cover: updatedUser.cover,
      bio: updatedUser.bio,
      friends: updatedUser.friends,
      token: generateToken(updatedUser._id),
    });
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
    isVerified: user.isVerified,
    image: user.image,
    cover: user.cover,
    bio: user.bio,
    isFriend,
  };
  const tweets = await Tweet.find({ user: id })
    .populate("user", "id name image isAdmin isVerified")
    .sort({ createdAt: -1 });

  const tweetsLikedByUser = await Tweet.find(
    {
      "likes.user": req.user._id,
    },
    "_id"
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

// @desc Verify a  user
// @route Get /api/user/verify/:id
// @access Private
const verifyUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }
  let msg = "";
  if (user.isVerified) {
    user.isVerified = false;
    msg = "Unverified";
  } else {
    user.isVerified = true;
    msg = "Verified";
  }

  await user.save();
  res.json({ message: `User is now ${msg}` });
});

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  addFriend,
  getRecommendedUser,
  editUser,
  verifyUser,
};
