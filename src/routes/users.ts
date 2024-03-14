import { NextFunction, Request, Response } from "express";
import { insertUser } from "../lib/db.js";
import { Schema, checkSchema, validationResult } from "express-validator";
import { user } from "@prisma/client";

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

const createUserSchema: Schema = {
  name: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Name cannot be empty / longer than 255 characters",
    },
  },
  email: {
    in: ["body"],
    isLength: {
      options: { min: 1 },
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Invalid email address format",
    },
    notEmpty: true,
  },
  companyId: {
    in: ["body"],
    isInt: {
      errorMessage: "companyId (number) is required",
    }
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 3 },
      errorMessage: "Password is required",
      bail: true,
    },
  },
};



export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  const { name, email, companyId, password } = req.body;

  let insertedUser: user | null = null;

  try {
    insertedUser = await insertUser({ name, email, companyId, password });
  } catch (e) {
    return next(e);
  }
  res.json({ user: insertedUser });
}

export const createUser = [validateUser, createUserHandler].flat();