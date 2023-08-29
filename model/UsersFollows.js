const mongoose = require("mongoose");
const Users = require("./Users");

const UserProfileSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      primaryKey: true,
      autoIncrement: true,
    },
    followerId: {
      type: Number,
      references: {
        model: Users,
        key: "id",
      },
    },
    followingId: {
      type: Number,
      references: {
        model: Users,
        key: "id",
      },
    },
    createdAt: {
      type: Date,
      defaultValue: Date.now,
    },
    deletedAt: {
      type: Date,
      allowNull: true,
    },
  },
);

module.exports = mongoose.model("UserFollows", UserProfileSchema);