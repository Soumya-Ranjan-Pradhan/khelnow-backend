const mongoose = require("mongoose");
const Users = require("./Users");

const UserProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      references: {
        model: Users,
        key: "id",
      },
    },
    bio: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    notification: {
      type: Boolean,
      required: true,
    },
    facebookUrl: {
      type: String,
      required: true,
    },
    instagramUrl: {
      type: String,
      required: true,
    },
    twitterUrl: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
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
//   { timestamps: true }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);
