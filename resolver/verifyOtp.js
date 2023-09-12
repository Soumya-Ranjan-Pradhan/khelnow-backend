
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../model/Users.js";
import otpStorage from "../usersRoutes/otpStorage.js";

dotenv.config();
const generateAuthToken = (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, {
    expiresIn,
  });
};
const resolvers = {
  Mutation: {
    verifyOTP: async (_, { input }) => {
      try {
        const { email, enteredOTP } = input;
        const actualOTP = otpStorage[email];

        if (!actualOTP) {
          throw new Error("OTP not found");
        }

        if (enteredOTP === actualOTP) {
          const user = await userModel.findOne({ email });

          if (!user) {
            throw new Error("User not found");
          }

          const accessToken = generateAuthToken(
            { _id: user.id, email: user.email },
            process.env.JWT_TOKEN,
            "12h"
          );

          const refreshToken = generateAuthToken(
            { _id: user.id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            "7d"
          );

          delete otpStorage[email];

          return {
            success: true,
            message: "OTP verified successfully",
            accessToken,
            refreshToken,
          };
        } else {
          throw new Error("Invalid OTP");
        }
      } catch (error) {
        return {
          success: false,
          message: error.message,
          accessToken: null,
          refreshToken: null,
        };
      }
    },
  },
};

export default resolvers;
