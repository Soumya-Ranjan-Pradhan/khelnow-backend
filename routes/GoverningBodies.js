import express from "express";
import {
  CreateGoverning,
  getAllGoverning,
  getGoverning,
  updateGoverning,
  deleteGovernig,
} from "../controllers/governigBodies.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", CreateGoverning);

router.get("/", getAllGoverning);

router.get("/:id", getGoverning);

router.put("/:id", updateGoverning);

router.delete("/:id", deleteGovernig);

export default router;
