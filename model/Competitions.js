const mongoose = require("mongoose");
const Sports = require("./Sports");

const CompetitionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sportsType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sports', // This is the name of the referenced collection
        required: true
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
        default: Date.now,
    },
    deletedAt: {
        type: Date,
    },
});

module.exports = mongoose.model("Competitions", CompetitionsSchema);
