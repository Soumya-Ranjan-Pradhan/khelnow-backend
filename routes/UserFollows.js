import express from "express";
const router = express.Router();
import { follow, unfollow } from "../controllers/userFollows.js";
import { verifyToken, jwtDecode } from "../middleware/verifyToken.js";

router.post("/follow", jwtDecode, verifyToken, follow);

router.post("/unfollow", jwtDecode, verifyToken, unfollow);

export default router;
