import mongoose from "mongoose";
// const Users = require("./Users");

const UserFollowsSchema = new mongoose.Schema(
  {
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
  }
);

const UserFollowsModel = mongoose.model("UserFollows", UserFollowsSchema);
export default UserFollowsModel
