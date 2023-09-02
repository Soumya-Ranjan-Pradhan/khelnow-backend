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

const SportsModel = mongoose.model('Sports', SportsSchema);

export default SportsModel;
