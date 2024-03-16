import { Request, Response, NextFunction } from "express";
import { checkSchema, validationResult } from "express-validator";
import { createCompanySchema, createItemSchema, createUserSchema, updateCompanySchema, updateItemSchema } from "./schemas.js";

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  await checkSchema(createUserSchema).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = errors.array().reduce((acc, cur, index) => {
      acc[index] = cur.msg;
      return acc;
    }, {} as Array<string>);
    return res.status(400).json({ errors: err });
  }

  next();
}

// Validate the request body for the item routes
export async function validateItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const reqType = req.method;
  if (reqType === "POST") {
    await checkSchema(createItemSchema).run(req);
  } else if (reqType === "PATCH") {
    await checkSchema(updateItemSchema).run(req);
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = errors.array().reduce((acc, cur, index) => {
      acc[index] = cur.msg;
      return acc;
    }, {} as Array<string>);
    return res.status(400).json({ errors: err });
  }

  next();
}


// Validate the request body for the company routes
export async function validateCompany(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const reqType = req.method;
  if (reqType === "POST") {
    await checkSchema(createCompanySchema).run(req);
  } else if (reqType === "PATCH") {
    await checkSchema(updateCompanySchema).run(req);
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = errors.array().reduce((acc, cur, index) => {
      acc[index] = cur.msg;
      return acc;
    }, {} as Array<string>);
    return res.status(400).json({ errors: err });
  }

  next();
}