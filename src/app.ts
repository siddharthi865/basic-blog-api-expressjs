import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

import errorHandler from "./middleware/error.middleware.js";
import postRoutes from "./routes/post.routes.js";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

app.use("/api/posts", postRoutes);

app.use(errorHandler);

export default app;
