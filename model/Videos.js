import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  sportsType: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

videoSchema.index({ videoUrl: 1 }, { videoUrl: true });
videoSchema.index({ caption: 1 }, { caption: true });

const videoModel = mongoose.model("Video", videoSchema);
export default videoModel;
