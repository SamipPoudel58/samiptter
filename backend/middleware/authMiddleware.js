const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized,token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized as an admin');
  }
};

const notGuest = (req, res, next) => {
  if (req.user && !req.user.isGuest) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized for guest accounts.');
  }
};

module.exports = { protect, admin, notGuest };
