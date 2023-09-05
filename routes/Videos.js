import express from "express";
const router = express.Router();
import {
  createVideos,
  AllVideos,
  getVideo,
  updatesVideo,
  deleteVideos,
} from "../controllers/videos.js";
// import verifyToken from '../middleware/verifyToken.js';

router.post("/", createVideos);

router.get("/", AllVideos);

router.get("/:id", getVideo);

router.put("/:id", updatesVideo);

router.delete("/:id", deleteVideos);

export default router;
