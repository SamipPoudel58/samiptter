const User = require('./models/userModel');
const Notification = require('./models/notificationModel');
const Tweet = require('./models/tweetModel');
const connectDB = require('./config/db');
const Following = require('./models/followingModel');
const Follower = require('./models/followerModel');

const purgeReadNotifications = async () => {
  try {
    await connectDB();

    await Notification.deleteMany({ read: true });

    console.log('Notifications purged');
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
      console.log('User not found');
      process.exit(1);
    }

    user.password = password;

    await user.save();
    console.log('Password changed');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const addFollowerData = async () => {
  try {
    await connectDB();

    const users = await User.find({});

    for (let user of users) {
      await Following.create({
        user: user._id,
        following: [],
      });

      await Follower.create({
        user: user._id,
        followers: [],
      });
    }

    console.log('Followers added');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const purgeOneDaySpam = async () => {
  try {
    await connectDB();

    const startOfDay = new Date('2023-06-13T00:00:00.000Z');
    const endOfDay = new Date('2023-06-14T00:00:00.000Z');

    const spamTweets = await Tweet.deleteMany({
      updatedAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    const spamUsers = await User.deleteMany({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    console.log('spams deleted');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const getImageLinks = async () => {
  try {
    await connectDB();

    const tweets = await Tweet.find({});

    const TweetImgs = [];
    tweets.forEach((tweet) => {
      if (tweet.images) {
        tweet.images.forEach((image) => TweetImg.push(image.secure_url));
      } else return;
    });

    console.log('tweets found', TweetImgs.length);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

getImageLinks();
