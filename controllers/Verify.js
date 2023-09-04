import otpStorage from "../usersRoutes/otpStorage.js";
import UserModel from "../model/Users.js";
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();


const verify = async (req, res) => {
  try {
    const { email, enteredOTP } = req.body;
    const isOTPValid = verifyOTP(email, enteredOTP);

    if (isOTPValid) {
      const token = await generateAuthToken(email);
      console.log(token);
      res.status(200).json({ message: "OTP verified successfully", token });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function verifyOTP(email, enteredOTP) {
  const actualOTP = otpStorage[email];
  return enteredOTP === actualOTP;
}

async function generateAuthToken(email) {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN, {
      expiresIn: '12h', 
    });

    return token;
  } catch (error) {
    throw error;
  }
}

export default verify;
