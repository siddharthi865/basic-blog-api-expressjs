import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10)
});

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  try {
    postSchema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json(err.errors);
  }
};