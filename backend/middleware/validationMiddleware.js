const { isValidEmail } = require('../utils/email');

const validateUserRegisterData = (req, res, next) => {
  let error;
  if (req.body.name.length > 20) {
    res.status(400);
    throw new Error('Name should be 20 characters maximum.');
  }

  if (!isValidEmail(req.body.email) && process.env.NODE_ENV !== 'development') {
    res.status(401);
    throw new Error('Invalid Email!');
  }

  if (error) {
    return res.status(400).json({ error });
  }
  next();
};

module.exports = { validateUserRegisterData };
