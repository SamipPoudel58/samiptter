const jwt = require('jsonwebtoken');

const generateEmailToken = (id) => {
  return jwt.sign({ id }, process.env.EMAIL_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30m',
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

const sendRefreshToken = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    path: '/',
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  generateEmailToken,
};
