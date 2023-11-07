const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        employerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        type: {
          type: String,
          enum: ["Text", "Media", "Document", "Link"],
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        text: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const message = mongoose.model("Message", messageSchema);

module.exports = message;
