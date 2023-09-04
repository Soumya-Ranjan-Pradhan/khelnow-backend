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

UserSchema.index({ email: 1 }, { unique: true }); 
UserSchema.index({ userName: 1 }, { unique: true });

//we are generating token
// UserSchema.methods.generateAuthToken = async function () {
//   try {
//     const token = Jwt.sign({ _id: this._id }, process.env.JWT_TOKEN);
//     this.tokens = this.tokens.concat({ token: token });
//     // console.log(token)
//     await this.save();
//     return token;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

const userModel = mongoose.model("User", UserSchema);

export default userModel;
