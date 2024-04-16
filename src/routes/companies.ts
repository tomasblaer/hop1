import { NextFunction, Response, Request } from "express";
import {
  getCompany,
  insertCompany,
  updateCompany,
  deleteCompanyById,
} from "../lib/db.js";
import { company, user } from "@prisma/client";
import { validateCompany } from "../lib/validation.js";
import { getCompanyId } from "../lib/util.js";
import { generateCompanyInitialUser } from "./users.js";

export async function listCompanyById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = getCompanyId(req);
  const company = await getCompany(id);

  if (!company) {
    return next(new Error("No company found"));
  }
}

export async function createCompany(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { name } = req.body;

  if (!name) {
    return next(new Error("Bad Request:Missing required fields, name"));
  }
  let companyCreated: company | null = null;
  let initialUser: user | null = null;
  try {
    companyCreated = await insertCompany({ name });
    if (!companyCreated) {
      return next(new Error("Company not created"));
    }
    initialUser = await generateCompanyInitialUser(companyCreated);

  } catch (err) {
    return next(err);
  }
  return res.status(201).json({
    'company': companyCreated,
    'admin': initialUser,
  });
}

export async function updateCompanyById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = getCompanyId(req);
  const { name } = req.body;

  if (!name) {
    return next(new Error("Bad Request:Missing required fields, name"));
  }

  let companyUpdated: company | null = null;
  try {
    companyUpdated = await updateCompany(id, { name });
  } catch (err) {
    return next(err);
  }

  return res.status(200).json(companyUpdated);
}

export async function deleteCompany(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = getCompanyId(req);
  const company = await deleteCompanyById(id);

  if (!company) {
    return next(new Error("No company found"));
  }

  return res.status(200).json(company);
}

export const createCompanyMiddleware = [ validateCompany, createCompany ].flat();
export const updateCompanyMiddleware = [ validateCompany, updateCompanyById ].flat();