import { NextFunction, Request, RequestHandler, Response } from "express";

export function unless(path: Array<string>, middleware: RequestHandler) {
  return function(req: Request, res: Response, next: NextFunction) {
      if (path.includes(req.baseUrl)) {
          return next();
      } else {
          return middleware(req, res, next);
      }
  };
};