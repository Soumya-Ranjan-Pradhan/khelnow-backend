import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const userId = decoded._id;
    req.user = userId;

    // const userId = decoded._id;
    // const user = await UserModel.findById(userId);
    // console.log(
    //   "🚀 ~ file: verifyToken.js:16 ~ verifyToken ~ decoded:",
    //   userId
    // );

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default verifyToken;
