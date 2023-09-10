import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  tokenValue: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String, 
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  latestRefreshToken: {
    type: String,
  },
  role: {
    type: String,
  },
  deviceIds: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  },
  tokens: [TokenSchema],
});

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ userName: 1 }, { unique: true });
UserSchema.index({ lastName: 1 }, { unique: true });
UserSchema.index({ firstName: 1 }, { unique: true });

const userModel = mongoose.model("User", UserSchema);

export default userModel;
