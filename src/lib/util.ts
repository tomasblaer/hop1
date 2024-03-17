import { NextFunction, Request, RequestHandler, Response } from "express";
import { JWTUser } from "./types.js";

export function unless(path: Array<string>, middleware: RequestHandler) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (path.includes(req.baseUrl)) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
}

export function getCompanyId(req: Request) {
  const user = req.user as JWTUser;
  return user.companyId;
}
