import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

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
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  latestRefreshToken: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  deviceIds: {
    deviceIds: {
      type: [String], 
      default: [],
    },
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    allowNull: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.index({ email: 1 }, { unique: false }); 
UserSchema.index({ userName: 1 }, { unique: true });

//we are generating token
UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = Jwt.sign({ _id: this._id }, process.env.JWT_TOKEN);
    this.tokens = this.tokens.concat({ token: token });
    // console.log(token)
    await this.save();
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const userModel = mongoose.model("User", UserSchema);

export default userModel;
