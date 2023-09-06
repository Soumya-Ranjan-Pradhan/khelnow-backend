import mongoose from "mongoose";

const CompetitionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },  
  sportsType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sports",
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  },
});

CompetitionsSchema.index({ name: 1 }, { unique: true });
CompetitionsSchema.index({ slug: 1 }, { unique: true });
const CompetitionsModel = mongoose.model("Competitions", CompetitionsSchema);

export default CompetitionsModel;
