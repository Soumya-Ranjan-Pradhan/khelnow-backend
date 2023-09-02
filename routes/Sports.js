import express from "express";
const router = express.Router();
import { createSport,getSports, getSportID, updateSports, deleteSports } from "../controllers/sports.js";

router.post("/sports", createSport);

router.get("/", getSports);

router.get("/sports/:id", getSportID);

router.put("/sports/:id", updateSports);

router.delete("/sports/:id", deleteSports);

export default router;
