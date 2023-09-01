const mongoose = require("mongoose");
const Users = require("./Users");

const UserFollowsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      primaryKey: true,
      autoIncrement: true,
    },
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", 
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Users", 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
    },
  },
);

module.exports = mongoose.model("UserFollows", UserFollowsSchema);
