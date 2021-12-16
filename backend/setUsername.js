const User = require("./models/userModel");
// const Tweet = require("./models/tweetModel");
const connectDB = require("./config/db");

const setUsername = async () => {
  try {
    await connectDB();

    const users = await User.find({});

    for (let user of users) {
      const foundUser = await User.findById(user._id);
      foundUser.username = foundUser._id.toString();
      await foundUser.save();
    }

    console.log("Usernames added");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

setUsername();
