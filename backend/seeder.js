const dotenv = require("dotenv");
const users = require("./data/users");
const tweets = require("./data/tweets");
const User = require("./models/userModel");
const Tweet = require("./models/tweetModel");
const connectDB = require("./config/db");

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Tweet.deleteMany();

    const createdUser = await User.insertMany(users);
    // const adminUser = createdUser[0]._id;
    const sampleTweets = tweets.map((tweet, i) => {
      return {
        ...tweet,
        user: createdUser[i]._id,
        comments: [],
      };
    });

    await Tweet.insertMany(sampleTweets);

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await Tweet.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
