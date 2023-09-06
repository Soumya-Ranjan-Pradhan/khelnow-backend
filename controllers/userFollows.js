
import UserFollowsModel from "../model/UsersFollows.js";
import jwt from "jsonwebtoken";
// User follow
const follow = async (req, res) => {
  try {
    const { followingId } = req.body;
    
    // const userId = req.decodedToken.id;

    const existingFollow = await UserFollowsModel.findOne({
      // userId,
      followingId,
    });
    if (existingFollow) {
      return res.status(400).json({ message: "User not following this." });
    }

    const newFollow = new UserFollowsModel({
      // userId,
      followingId,
    });
    await newFollow.save();

    return res.status(201).json({ message: "User following" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// User unfollow
const unfollow = async (req, res) => {
  try {
    const { followingId } = req.body;
    // const userId = req.decodedToken.id;

    const result = await UserFollowsModel.findOneAndDelete({
      // userId,
      followingId,
    });
    // console.log("🚀 ~ file: userFollows.js:44 ~ ~ result:", result);
    // console.log("🚀 ~ file: userFollows.js:44 ~ unfollow ~ result:", decodedToken.id);

    if (!result) {
      return res.status(400).json({ message: "User not following." });
    }

    return res.status(200).json({ message: "Unfollowed the user." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export { follow, unfollow };





// just try

// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// const verifyToken = (req, res, next) => {
//   const authorizationHeader = req.headers.authorization;

//   if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authorizationHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_TOKEN);

//     const userId = decoded._id;
//     req.user = userId;

//     // const userId = decoded._id;
//     // const user = await UserModel.findById(userId);
//     // console.log(
//     //   "🚀 ~ file: verifyToken.js:16 ~ verifyToken ~ decoded:",
//     //   userId
//     // );

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Token is not valid" });
//   }
// };

// export default verifyToken;





