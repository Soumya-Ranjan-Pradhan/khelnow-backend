import mongoose from 'mongoose';
// const Sports = require("./Sports");

const PlayersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sportsType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sports',
        required: true
    },
    avatarUrl: {
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
PlayersSchema.index({ name: 1 }, { unique: true });
PlayersSchema.index({ slug: 1 }, { unique: true });

const PlayersModel = mongoose.model("Players", PlayersSchema);

export default PlayersModel;
