import { Request, Response, NextFunction } from "express";

import prisma from "../config/prisma";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content } = req.body;

    const availablePost = await prisma.post.findFirst({
      where: { title: title },
    });

    if (availablePost) {
      return res.status(409).json({
        message: `Post with title '${title}' already exists!`,
      });
    }

    const post = await prisma.post.create({
      data: { title, content, updatedAt: new Date() },
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content } = req.body;

    const availablePost = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!availablePost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await prisma.post.update({
      where: { id: Number(req.params.id) },
      data: { title, content, updatedAt: new Date() },
    });

    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await prisma.post.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};
