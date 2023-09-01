const mongoose = require("mongoose");

const SportsSchema = new mongoose.Schema({
    name: {
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

module.exports = mongoose.model("Sports", SportsSchema);
