const User = require("../models/userModel");
const Tweet = require("../models/tweetModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const Notification = require("../models/notificationModel");
require("dotenv").config();

// @desc Auth user and get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  let { email, password, guest } = req.body;

  if (guest) {
    email = process.env.GUEST_EMAIL;
    password = process.env.GUEST_PASSWORD;
  }

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      friends: user.friends,
      bio: user.bio,
      image: user.image,
      cover: user.cover,
      token: generateToken(user._id),
      isGuest: !!guest,
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

  const createdUser = await User.create({
    name,
    email,
    password,
    image: `https://robohash.org/${name}/set_set${Math.floor(
      Math.random() * 2 + 1
    )}?size=400x400`,
    friends: [],
  });

  createdUser.username = createdUser._id.toString();

  const user = await createdUser.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
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

// @desc Get users list
// @route GET /api/users
// @access Private
const getUsersList = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i", // case insensitive
        },
      }
    : {};
  let users = await User.find({ ...keyword })
    .select("-password -email")
    .sort({ createdAt: -1 });

  res.json(users);
});

// @desc Edit user profile details
// @route PUT /api/users
// @access Private
const editUser = asyncHandler(async (req, res) => {
  const { id, name, username, bio, password, image, cover } = req.body;
  console.log(id);

  if (username.length > 15) {
    res.status(401);
    throw new Error("Username should be 15 characters maximum.");
  }

  if (name.length > 20) {
    res.status(401);
    throw new Error("Name should be 20 characters maximum.");
  }

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
  user.username = username.toLowerCase().replace(/\s+/g, "") || user.username;
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
      username: updatedUser.username,
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
    username: user.username,
    friends: user.friends,
    isAdmin: user.isAdmin,
    isVerified: user.isVerified,
    image: user.image,
    cover: user.cover,
    bio: user.bio,
    isFriend,
  };
  const tweets = await Tweet.find({ user: id })
    .populate("user", "id name username image isAdmin isVerified")
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
  let action = "";
  if (!userExist) {
    user.friends.push({ user: id });
    action = "added";
  } else {
    user.friends = user.friends.filter(
      (f) => f.user.toString() !== userExist.user.toString()
    );
    action = "removed";
  }
  await user.save();

  const notification = new Notification({
    receiver: id,
    sender: req.user._id,
    read: false,
    action: "follow",
    message: "followed you.",
    link: `/profile/${req.user._id}`,
  });

  await notification.save();

  res.json("User " + action);
});

// @desc Get recommended user
// @route GET /api/users/recommended
// @access Private
const getRecommendedUser = asyncHandler(async (req, res) => {
  const userSize = 3;
  let currentUser = await User.findById(req.user._id);
  let friendArray = currentUser.friends.map((f) => f.user);
  // TODO: Limit unnecessary data sent
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

    const notification = new Notification({
      receiver: user,
      sender: req.user._id,
      read: false,
      action: "verified",
      message: "verified you. Congrats!",
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
    throw new Error("User Not Found");
  }

  await Notification.updateMany({ receiver: req.user._id }, { read: true });

  const notifications = await Notification.find({
    receiver: req.user._id,
  })
    .populate("sender", "id name image isAdmin isVerified")
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
    throw new Error("User Not Found");
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
  getUserProfile,
  addFriend,
  getRecommendedUser,
  editUser,
  verifyUser,
  getUsersList,
  getNotifications,
  getUnreadNotifications,
};
