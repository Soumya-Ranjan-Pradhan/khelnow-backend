import express from "express";
import {
    CreateGoverning , getAllGoverning, getGoverning, updateGoverning, deleteGovernig
} from "../controllers/governigBodies.js"
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, CreateGoverning);

router.get("/", verifyToken, getAllGoverning);

router.get("/:id", verifyToken, getGoverning);

router.put("/:id", verifyToken, updateGoverning);

router.delete("/:id",verifyToken, deleteGovernig);

export default router;
