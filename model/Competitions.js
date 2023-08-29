const mongoose = require("mongoose");
const Sports = require("./Sports");

const Competitions = new mongoose.Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: String,
        required: true
      },
      sportsType: {
        type: String,
        references: {
          model: Sports,
          key: 'name',
        },
      },
      logoUrl: {
        type: String,
        required: true
      },
      kheltagId: {
        type: Number,
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

module.exports = mongoose.model("Competitions", Competitions);