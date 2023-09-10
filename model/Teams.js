import mongoose from "mongoose";

const TeamsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  },
});

const TeamModel = mongoose.model("Team", TeamsSchema);
export default TeamModel;
