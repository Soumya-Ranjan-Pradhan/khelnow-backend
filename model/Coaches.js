import mongoose from "mongoose";

const coachesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  sportsType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sports",
    required: true,
  },
});

coachesSchema.index({ name: 1 }, { unique: true });
coachesSchema.index({ slug: 1 }, { unique: true });
coachesSchema.index({ sportsType: 1 }, { unique: true });

const coachesModel = mongoose.model("Coaches", coachesSchema);

export default coachesModel;