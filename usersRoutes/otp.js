import {otp} from "../controllers/otp.js";

import { Router } from "express";

const router = Router();

router.post("/", otp);

export default router;
