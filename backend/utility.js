const User = require("./models/userModel");
const Notification = require("./models/notificationModel");
// const Tweet = require("./models/tweetModel");
const connectDB = require("./config/db");

const purgeReadNotifications = async () => {
  try {
    await connectDB();

    await Notification.deleteMany({ read: true });

    console.log("Notifications purged");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const changePassword = async (email, password) => {
  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      process.exit(1);
    }

    user.password = password;

    await user.save();
    console.log("Password changed");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// purgeReadNotifications();

// changePassword("user@gmail.com", "abcd1234");
