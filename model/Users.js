const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    latestRefreshToken: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    deviceIds: {
      type: String,
      defaultValue: [],
    },
    createdAt: {
      type: Date,
      defaultValue: Date.now,
    },
    deletedAt: {
      type: Date,
      allowNull: true,
    },
  }
  //   { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ userName: 1 }, { unique: true });
UserSchema.index({ mobile: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
