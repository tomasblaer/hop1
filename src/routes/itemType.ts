import { NextFunction, Response, Request } from "express";
import { Prisma, item_type } from "@prisma/client";
import {
  deleteItemType,
  getCompany,
  getItemType,
  getItemTypes,
  insertItemType,
  updateItemType
 } from "../lib/db";
import { validateItemType } from "../lib/validation";
import { getCompanyId } from "../lib/util";

export async function getItemTypeById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = req.params.id;
  const itemType = getItemType(id);

  if (!itemType) {
    return next(new Error("No item type found"));
  }

  return res.json(itemType);
}


export async function getItemTypesByCId(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const companyId = getCompanyId(req);
  const itemTypes = getItemTypes(companyId);


  if (!itemTypes) {
    return next(new Error("No item types found"));
  }

  return res.json(itemTypes);
}

export async function createItemType(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { name, price, } = req.body;
  const companyId = getCompanyId(req);

  if (!name || !price || !companyId) {
    return next(new Error("Bad Request:Missing required fields"));
  }

  let newItemType: item_type | null = null;
  try {
    newItemType = await insertItemType({ name, price, companyId });
  } catch (err) {
    return next(err);
  }

  return res.status(201).json(newItemType);
}

export async function updateItemTypeById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = req.params.id;
  const { name, price } = req.body;
  const companyId = getCompanyId(req);

  if (!name || !price || !companyId) {
    return next(new Error("Bad Request:Missing required fields"));
  }

  let itemTypeUpdated: item_type | null = null;
  try {
    itemTypeUpdated = await updateItemType(id, { name, price, companyId });
  } catch (err) {
    return next(err);
  }

  return res.status(200).json(itemTypeUpdated);
}

export async function deleteItemTypeById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = req.params.id;
  const itemType = deleteItemType(id);

  if (!itemType) {
    return next(new Error("No item type found"));
  }

  return res.json(itemType);
}

export const createItemTypeMiddleware = [ validateItemType, createItemType ].flat();
export const updateItemTypeMiddleware = [ validateItemType, updateItemTypeById ].flat();
