import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-unused-vars */
export function handle404(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(404).json({ error: "Not found" });
}

export function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const actionType: string = req.originalUrl
    if (err.code === "P2002") {
      // Unique constraint failed in team creation / update
      return res
        .status(400)
        .json({ error: `error executing, ${actionType} already exists` });
    } else if (err.code === "P2025") {
      // Record to delete / update not found
      return res
        .status(400)
        .json({ error: `error executing, ${actionType} not found` });
    } else if (err.code === "P2003") {
      // Foreign key constraint failed in game creation / update
      return res
        .status(400)
        .json({ error: `error executing, companyId must be valid` });
    }
  }

  if (
    err instanceof SyntaxError &&
    "status" in err &&
    err.status === 400 &&
    "body" in err
  ) {
    return res.status(400).json({ error: "invalid json" });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: err.message });
  }

  if (err.message.includes("Bad Request:")) {
    // Ljott string hack :(
    return res
      .status(400)
      .json({ error: err.message.replace("Bad Request:", "") });
  }

  console.error("error handling route", err);
  return res
    .status(500)
    .json({ error: err.message ?? "internal server error" });
}
