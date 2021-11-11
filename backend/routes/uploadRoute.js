const express = require("express");
const cloudinary = require("../utils/cloudinary.js");
const upload = require("../utils/multer.js");

const router = express.Router();

router.post("/", upload.array("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const upldr = async (path) => await cloudinary.uploader.upload(path);
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      console.log(path);
      const newPath = await upldr(path);
      urls.push({
        secure_url: newPath.secure_url,
        public_id: newPath.public_id,
      });
    }

    res.send(urls);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
