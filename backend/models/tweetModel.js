const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    tweetContent: {
      type: String,
      required: true,
    },

    likes: [],
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const tweetSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tweetContent: {
      type: String,
    },
    images: {
      type: [
        {
          secure_url: {
            type: String,
          },
          public_id: {
            type: String,
          },
        },
      ],
      default: [],
    },
    comments: [commentSchema],
    numComments: {
      type: Number,
      required: true,
      default: 0,
    },
    likes: [likeSchema],
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
