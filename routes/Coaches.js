import express from "express";
const router = express.Router();
import {
  createCoaches,
  getNewCoaches,
  getAllCoaches,
  updateCoaches,
  deleteCoaches,
} from "../controllers/coaches.js";
// import verifyToken from "../middleware/verifyToken.js";

router.post("/", createCoaches);

router.get("/", getNewCoaches);

router.get("/:id", getAllCoaches);

router.put("/:id", updateCoaches);

router.delete("/:id",deleteCoaches);

export default router;
