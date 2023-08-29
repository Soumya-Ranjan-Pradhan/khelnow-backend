const mongoose = require("mongoose");
const Sports = new mongoose.Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Number,
        required:true
      },
      kheltagId: {
        type: Number,
        required: true
      },
      slug: {
        type: String,
        required:true
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

    module.exports = mongoose.model("Sports", Sports);