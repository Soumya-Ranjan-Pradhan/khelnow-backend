import express from "express";
const router = express.Router();
import {createProfile, getProfile, updateProfile, deleteProfile } from "../controllers/userProfile.js";
import {verifyToken} from "../middleware/verifyToken.js";

router.post("/", verifyToken, createProfile);

router.get("/:id", verifyToken, getProfile);

router.put("/:id", verifyToken, updateProfile);

router.delete("/:id", verifyToken, deleteProfile);

export default router;
