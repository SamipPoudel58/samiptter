const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/userController");

router.post("/login", loginUser);
router.route("/").post(registerUser);

module.exports = router;
