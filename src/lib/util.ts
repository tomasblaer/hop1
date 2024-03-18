import { Request } from "express";
import { JWTUser } from "./types.js";

export function getCompanyId(req: Request) {
  const user = req.user as JWTUser;
  return user.companyId;
}
