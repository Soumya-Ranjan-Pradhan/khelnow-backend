const mongoose = require("mongoose");
const Sports = require("./Sports");

const Players = new mongoose.Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Number,
        required: true
      },
      sportsType: {
        type: String,
        references: {
          model: Sports,
          key: 'name',
        },
      },
      avatarUrl: {
        type: String,
        required: true
      },
      kheltagId: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        defaultValue: Date.now,
      },
      deletedAt: {
        type: Date,
        allowNull: true,
      },
})

module.exports = mongoose.model("Players", Players);