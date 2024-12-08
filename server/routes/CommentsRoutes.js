import express from "express";
import {
  crateNewComment,
  getAllCommentsByPostId,
  deleteCommentById,
} from "../controllers/commentController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, crateNewComment);

router.get("/All/:postId", getAllCommentsByPostId);

router.delete("/delete/:commentsId", verifyToken, deleteCommentById);

export default router;
