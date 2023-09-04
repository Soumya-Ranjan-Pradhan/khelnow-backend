import express from "express";
const router = express.Router();
import { createSport,getSports, getSportID, updateSports, deleteSports } from "../controllers/sports.js";
import verifyToken from "../middleware/verifyToken.js";

router.post("/sports", verifyToken, createSport);

router.get("/", verifyToken, getSports);

router.get("/sports/:id", verifyToken, getSportID);

router.put("/sports/:id", verifyToken, updateSports);

router.delete("/sports/:id", verifyToken, deleteSports);

export default router;
