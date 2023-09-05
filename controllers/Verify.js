import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../model/Users.js";
import otpStorage from "../usersRoutes/otpStorage.js"; 
dotenv.config();

const generateAuthToken = (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, {
    expiresIn,
  });
};

const verify = async (req, res) => {
  try {
    const { email, enteredOTP } = req.body;
    const isOTPValid = verifyOTP(email, enteredOTP);

    if (isOTPValid) {
      const user = await UserModel.findOne({ email });

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

      res.status(200).json({
        message: "OTP verified successfully",
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOTP = (email, enteredOTP) => {
  const actualOTP = otpStorage[email];
  return enteredOTP === actualOTP;
};

export default verify;
