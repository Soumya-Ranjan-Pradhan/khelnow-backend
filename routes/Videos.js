import express from 'express';
const router = express.Router();
import {
  createVideos,
  AllVideos,
  getVideo,
  updatesVideo,
  deleteVideos,
} from "../controllers/videos.js";
import verifyToken from '../middleware/verifyToken.js';


router.post("/", verifyToken, createVideos);

router.get("/", verifyToken, AllVideos);

router.get("/:id", verifyToken, getVideo);
 
router.put("/:id",verifyToken, updatesVideo);

router.delete("/:id",verifyToken, deleteVideos);

export default router;
