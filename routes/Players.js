import express from "express";
const router = express.Router();
import {
  createPlayers,
  getAllPlayers,
  getPlayers,
  updatePlayers,
  deletePlayers,
} from "../controllers/players.js";
import verifyToken from "../middleware/verifyToken.js";

router.post("/", verifyToken, createPlayers);

router.get("/", verifyToken, getAllPlayers);

router.get("/:id", verifyToken, getPlayers);

router.get("/:id", verifyToken, getAllPlayers);

router.put("/:id", verifyToken, updatePlayers);

router.delete("/:id", verifyToken, deletePlayers);

export default router;
