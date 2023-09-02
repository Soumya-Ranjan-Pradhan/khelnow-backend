import express from "express";
const router = express.Router();
import {createProfile, getProfile, updateProfile, deleteProfile } from "../controllers/userProfile.js";

router.post("/", createProfile);

router.get("/:id", getProfile);

router.put("/:id", updateProfile);

router.delete("/:id", deleteProfile);

export default router;
