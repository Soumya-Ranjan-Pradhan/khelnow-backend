import express from "express";
const router = express.Router();
import {
  createCoaches,
  getNewCoaches,
  getAllCoaches,
  updateCoaches,
  deleteCoaches,
} from "../controllers/coaches.js";
import verifyToken from "../middleware/verifyToken.js";

router.post("/",verifyToken, createCoaches);

router.get("/",verifyToken, getNewCoaches);

router.get("/:id",verifyToken, getAllCoaches);

router.put("/:id",verifyToken, updateCoaches);

router.delete("/:id",verifyToken, deleteCoaches);

export default router;
