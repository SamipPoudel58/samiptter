const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');
const asyncHandler = require('../utils/asyncHandler');

// @desc Get informations for dashboard
// @route GET /api/dashboard
// @access Private + Admin
const dashBoardData = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments({});
  const tweetCount = await Tweet.countDocuments({});
  const latestUsers = await User.find({}).limit(5).sort({ createdAt: -1 });

  res.json({ userCount, tweetCount, latestUsers });
});

module.exports = {
  dashBoardData,
};
