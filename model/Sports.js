import mongoose from 'mongoose';

const SportsSchema = new mongoose.Schema({
  name: {
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
SportsSchema.index({ name: 1 }, { unique: true });
SportsSchema.index({ slug: 1 }, { unique: true });
const SportsModel = mongoose.model('Sports', SportsSchema);

export default SportsModel;
