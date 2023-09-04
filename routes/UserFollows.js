import express from "express";
const router = express.Router();
import {follow, unfollow } from "../controllers/userFollows.js";
import verifyToken from "../middleware/verifyToken.js";

router.post("/follow",verifyToken, follow);

router.post("/unfollow", verifyToken, unfollow);

export default router;
