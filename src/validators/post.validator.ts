import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";


const postSchema = z.object({
  title: z
    .string({ message: "Title must be a string." })
    .min(3, { message: "Title should be more than 3 characters." }),
  content: z
    .string({ message: "Content must be a string." })
    .min(10, { message: "Content should be more than 10 characters." }),
});

export const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    postSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json(
        err.issues.map((err) => {
          return { message: err.message, field: err.path?.[0] };
        }) || "Validation failed",
      );
    }

    return res.status(400).json({
      message: "Something went wrong",
    });
  }
};
