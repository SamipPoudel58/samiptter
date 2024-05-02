const express = require('express');
const cloudinary = require('../utils/cloudinary.js');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const files = req.body.data;
    const urls = [];
    for (const file of files) {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: 'samiptter',
      });
      urls.push({
        secure_url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      });
    }

    res.json(urls);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
