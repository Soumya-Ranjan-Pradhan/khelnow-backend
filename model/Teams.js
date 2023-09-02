import mongoose from 'mongoose';
// const Sports = require("./Sports");

const TeamsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sportsType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sports',
        required: true
    },
    logoUrl: {
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
        default: Date.now,
    },
    deletedAt: {
        type: Date,
    },
});

const TeamModel = mongoose.model("Teams", TeamsSchema);
export default TeamModel;
