const nodemailer = require('nodemailer');
const { generateEmailToken } = require('./tokens');
const { loadHtmlTemplate } = require('../utils/files.js');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email) => EMAIL_REGEX.test(email);

const sendConfirmationEmail = async (email, id) => {
  try {
    const htmlTemplate = await loadHtmlTemplate();
    const confirmationLink = `${
      process.env.CLIENT_URL
    }/confirmation/${generateEmailToken(id)}`;
    const emailContent = htmlTemplate.replace(
      '{{CONFIRMATION_LINK}}',
      confirmationLink
    );

    await transporter.sendMail({
      to: email,
      subject: 'Confirm Your Samiptter Account',
      html: emailContent,
    });
    console.log('Email Sent Successfully');
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
};

module.exports = { transporter, sendConfirmationEmail, isValidEmail };
