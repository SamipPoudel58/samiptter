const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const sendRefreshToken = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
};
