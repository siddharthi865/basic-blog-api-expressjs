import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} from "../controllers/post.controller.js";
import { validatePost } from "../validators/post.validator.js";

const router = Router();

router.post("/", validatePost, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", validatePost, updatePost);
router.delete("/:id", deletePost);

export default router;