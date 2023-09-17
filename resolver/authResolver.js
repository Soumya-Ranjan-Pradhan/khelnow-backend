import jwt from "jsonwebtoken";
import userModel from "../model/Users.js";
import sendOTPEmail from "../usersRoutes/sendMail.js";
import otpStorage from "../usersRoutes/otpStorage.js";
import dotenv from "dotenv";
dotenv.config();

const generateAuthToken = (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, {
    expiresIn,
  });
};

const authUserResolvers = {
  Mutation: {
    login: async (_, { input }) => {
      try {
        const { email } = input;
        const user = await userModel.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        await sendOTPEmail(email);

        return {
          success: true,
          message: "OTP sent successfully",
          accessToken: null,
          refreshToken: null,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          accessToken: null,
          refreshToken: null,
        };
      }
    },

    register: async (_, { input }) => {
      try {
        const { userName, email } = input;

        const userExists = await userModel.findOne({
          $or: [{ email }, { userName }],
        });

        if (userExists) {
          throw new Error("User with this email or username already exists");
        }

        const newUser = new userModel(input);
        await newUser.save();

        await sendOTPEmail(email);
        console.log("sendOtp Email", sendOTPEmail, email);

        return {
          success: true,
          message:
            "Registration successful. OTP sent to your email for verification.",
          accessToken: null,
          refreshToken: null,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          accessToken: null,
          refreshToken: null,
        };
      }
    },

    validateWithOtp: async (_, { input }) => {
        console.log("input",input)
      try {
        const { email, enteredOTP } = input;
        const actualOTP = otpStorage[email];

        console.log(actualOTP)
        if (!actualOTP) {
          throw new Error("OTP not found");
        }

        if (enteredOTP === actualOTP) {
          const user = await userModel.findOne({ email });

          if (!user) {
            throw new Error("User not found");
          }

          console.log("Generating tokens...");
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
          console.log("Generated tokens:", accessToken, refreshToken);

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

    sendOTP: async (_, { input }) => {
      try {
        const { email } = input;
        const user = await userModel.findOne({ email });

        if (!user) {
          throw new Error("Email not registered");
        }

        await sendOTPEmail(email);

        return {
          success: true,
          message: "OTP email sent successfully",
          error: null,
        };
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

export default authUserResolvers;
