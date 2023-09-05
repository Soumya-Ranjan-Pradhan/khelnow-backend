import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import UserModel from "../model/Users.js";

const generateAuthToken = async (email) => {
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      const token = jwt.sign(
        { _id: user.id, email: user.email },
        process.env.JWT_TOKEN,
        {
          expiresIn: "12h",
        }
      );
  
      const refreshToken = jwt.sign(
        { _id: user.id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );
  
      return {token,refreshToken};
    } catch (error) {
      throw error;
    }
  

}
export default generateAuthToken 
