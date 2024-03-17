import { NextFunction, Response, Request } from "express";
import {
  getCompany,
  insertCompany,
  updateCompany,
  deleteCompany,
} from "../lib/db.js";
import { company } from "@prisma/client";
import { validateCompany } from "../lib/validation.js";

export async function listCompanyById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = req.params.id;
  const company = await getCompany(parseInt(id));

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
  try {
    companyCreated = await insertCompany({ name });
  } catch (err) {
    return next(err);
  }

  return res.status(201).json(companyCreated);
}

export async function updateCompanyById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = req.params.id;
  const { name } = req.body;

  if (!name) {
    return next(new Error("Bad Request:Missing required fields, name"));
  }

  let companyUpdated: company | null = null;
  try {
    companyUpdated = await updateCompany(parseInt(id), { name });
  } catch (err) {
    return next(err);
  }

  return res.status(200).json(companyUpdated);
}

export async function deleteCompanyById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = req.params.id;
  const company = await deleteCompany(parseInt(id));

  if (!company) {
    return next(new Error("No company found"));
  }

  return res.status(200).json(company);
}

export const createCompanyMiddleware = [ validateCompany, createCompany ].flat();
export const updateCompanyMiddleware = [ validateCompany, updateCompanyById ].flat();