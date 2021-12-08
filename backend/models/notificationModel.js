const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    read: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: "like",
    },
    message: {
      type: String,
      required: true,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
