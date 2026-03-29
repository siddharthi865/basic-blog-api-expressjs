import { Router } from "express";

import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { validatePost } from "../validators/post.validator.js";

const router = Router();

// Create New Post
router.post("/", validatePost, createPost);

// Get All Posts
router.get("/", getPosts);

// Get Post By Id
router.get("/:id", getPost);

// Update Post
router.put("/:id", validatePost, updatePost);

// Delete Post
router.delete("/:id", deletePost);

export default router;
