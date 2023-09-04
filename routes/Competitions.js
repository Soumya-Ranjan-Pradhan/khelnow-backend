import express from "express";
const router = express.Router();
import {
    createCompetitions, getAllCompetitions, getCompetitions, updateCompetitions, deleteCompetitions
} from "../controllers/competitions.js";
import verifyToken from "../middleware/verifyToken.js";

router.post("/", verifyToken, createCompetitions);

router.get("/", verifyToken, getAllCompetitions);

router.get("/:id", verifyToken, getCompetitions);

router.put("/:id", verifyToken, updateCompetitions);

router.delete("/:id", verifyToken, deleteCompetitions);

export default router;
