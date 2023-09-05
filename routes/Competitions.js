import express from "express";
const router = express.Router();
import {
    createCompetitions, getAllCompetitions, getCompetitions, updateCompetitions, deleteCompetitions
} from "../controllers/competitions.js";
// import verifyToken from "../middleware/verifyToken.js";

router.post("/", createCompetitions);

router.get("/", getAllCompetitions);

router.get("/:id", getCompetitions);

router.put("/:id", updateCompetitions);

router.delete("/:id", deleteCompetitions);

export default router;
