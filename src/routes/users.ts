import { NextFunction, Request, Response } from "express";
import { getUser, insertUser } from "../lib/db.js";
import bcrypt from "bcrypt";
import { user } from "@prisma/client";
import { validateUser } from "../lib/validation.js";
import { getCompanyId } from "../lib/util.js";

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  const { username, email, password } = req.body;
  const companyId = getCompanyId(req);

  let insertedUser: user | null = null;

  const hashed = await bcrypt.hash(password, 10);

  try {
    insertedUser = await insertUser({ username, email, companyId, password: hashed });
  } catch (e) {
    return next(e);
  }
  res.status(201).json( `User ${insertedUser?.username} created` );
}

export async function getUserByUsername(username: string): Promise<user | null> {

  let user: user | null = null;
  user = await getUser(username);
  return user;
}

export const createUser = [validateUser, createUserHandler].flat();