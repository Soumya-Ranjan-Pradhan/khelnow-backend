import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    videoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likeDate: {
        type: Date,
        default: Date.now
    }
})

const Like = mongoose.model("Like",likeSchema)

export default Like;