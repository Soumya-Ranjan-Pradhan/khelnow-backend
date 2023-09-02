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
TeamsSchema.index({ name: 1 }, { unique: true });
TeamsSchema.index({ slug: 1 }, { unique: true });
const TeamModel = mongoose.model("Teams", TeamsSchema);
export default TeamModel;
