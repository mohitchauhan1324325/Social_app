import express from "express";
import protect from "../middleware/authMiddleware.js";
import { addComment, createPost, deleteComment, deletePost, getAllPosts, likePost } from "../controller/postController.js";

const router = express.Router();

import upload from "../middleware/upload.js";

router.post(
    "/",
    protect,
    upload.single("image"),
    createPost
);

router.get("/", getAllPosts);

router.delete("/:id", protect, deletePost);

router.put("/:id/like", protect, likePost);

router.post("/:id/comment", protect, addComment);

router.delete(
    "/:postId/comment/:commentId",
    protect,
    deleteComment
);

export default router;