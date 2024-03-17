import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { getSale } from "./db.js";
import { user } from "@prisma/client";

export function getSecretAssert(): string {
  let secret = process.env.SECRET;
  if (!secret) {
    console.error("No secret found, please see .env example file");
    process.exit(1);
  }
  return secret;
}

export const authenticateJWT = passport.authenticate("jwt", { session: false });

export function ensureCompany(req: Request, res: Response, next: NextFunction) {
  const user = req.user as user;
  console.log('user',user);
  if (user.companyId !== parseInt(req.params.companyId)) {
    return res.status(401).json({ message: "Unauthorized, companyId does not match" });
  }
  next();
}

export async function ensureSaleId(req: Request, res: Response, next: NextFunction) {

  const user = req.user as user;
  const sale = await getSale(req.params.saleId);

  if (!sale) {
    return res.status(404).json({ message: "Sale not found" });
  }
  // If sale does not belong to user company
  if (sale.companyId !== user.companyId) {
    return res.status(401).json({ message: "Unauthorized, companyId does not match" });
  }
  next();
}