import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./routes/api.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ error: "Not found" });
});
