import express from "express";
const router = express.Router();
import {createTeams, getAllTeams, getTeams, updateTeams, deleteTeams} from "../controllers/teams.js";
import verifyToken from "../middleware/verifyToken.js";

router.post("/", verifyToken, createTeams);

router.get("/", verifyToken, getAllTeams);

router.get("/:id", verifyToken, getTeams);

router.put("/:id", verifyToken, updateTeams);

router.delete("/:id", verifyToken, deleteTeams);

export default router;
