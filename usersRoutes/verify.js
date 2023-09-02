import express from "express";
const router = express.Router();
import Verify from "../controllers/Verify.js";

router.post("/verify-otp", Verify);

export default router;
