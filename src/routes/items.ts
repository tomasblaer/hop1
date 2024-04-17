import { NextFunction, Response, Request } from "express";
import {
  getItemsInCompany,
  getItemsInSale,
  insertItem,
  updateItem,
  deleteItem,
  getItemsInType,
} from "../lib/db.js";
import { item } from "@prisma/client";
import { validateItem } from "../lib/validation.js";
import { getCompanyId } from "../lib/util.js";

export async function addItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {

  const { comment, location } = req.body;
  const itemTypeId = req.params.itemTypeId;
  const companyId = getCompanyId(req);

  let itemCreated: item | null = null;
  try {
    itemCreated = await insertItem({
      itemTypeId,
      companyId,
      comment,
      location,
    });
  } catch (err) {
    return next(err);
  }

  return res.status(201).json(itemCreated);
}

export async function editItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = parseInt(req.params.id);
  
  const { comment, location } = req.body;

  let itemUpdated: item | null = null;
  try {
    itemUpdated = await updateItem(id, { comment, location });
  } catch (err) {
    return next(err);
  }

  return res.status(200).json(itemUpdated);
}

export async function removeItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = parseInt(req.params.id);

  let itemDeleted: item | null = null;
  try {
    itemDeleted = await deleteItem(id);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json(itemDeleted);
}

export async function listItemsInSale(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const saleId = req.params.saleId;
  const item = await getItemsInSale(saleId);

  if (!item) {
    return next(new Error("No items found"));
  }

  return res.json(item);
}

export async function listItemsInCompany(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {

  const companyId = getCompanyId(req);
  const item = await getItemsInCompany(companyId);


  if (!item) {
    return next(new Error("No items found"));
  }

  return res.json(item);
}

export async function listItemsInType(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const itemTypeId = req.params.itemTypeId;
  const item = await getItemsInType(itemTypeId);

  if (!item) {
    return next(new Error("No items found"));
  }

  return res.json(item);
}

/* Exports with middleware */

export const createItemMiddleware = [validateItem, addItem].flat();
export const updateItemMiddleware = [validateItem, editItem].flat();
