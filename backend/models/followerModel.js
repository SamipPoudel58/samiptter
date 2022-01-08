const mongoose = require("mongoose");

const followerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    followers: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Follower = mongoose.model("Follower", followerSchema);

module.exports = Follower;
