import express from "express";
const router = express.Router();
import {createTeams, getAllTeams, getTeams, updateTeams, deleteTeams} from "../controllers/teams.js";

router.post("/", createTeams);

router.get("/", getAllTeams);

router.get("/:id", getTeams);

router.put("/:id", updateTeams);

router.delete("/:id", deleteTeams);

export default router;
