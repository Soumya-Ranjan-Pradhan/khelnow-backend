import express from "express";
const router = express.Router();
import {follow, unfollow } from "../controllers/userFollows.js";

router.post("/follow",follow);

router.post("/unfollow", unfollow);

export default router;
