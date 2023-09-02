import express from "express";
const router = express.Router();
import {
  createPlayers,
  getAllPlayers,
  getPlayers,
  updatePlayers,
  deletePlayers,
} from "../controllers/players.js";

router.post("/", createPlayers);

router.get("/", getAllPlayers);

router.get("/:id", getPlayers);

router.get("/:id", getAllPlayers);

router.put("/:id", updatePlayers);

router.delete("/:id", deletePlayers);

export default router;
