const mongoose = require("mongoose");

const followingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    following: {
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

const Following = mongoose.model("Following", followingSchema);

module.exports = Following;
