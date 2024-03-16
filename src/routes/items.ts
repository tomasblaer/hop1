import { NextFunction, Response, Request } from "express";
import {
  getItemsInCompany,
  getItemsInSale,
  insertItem,
  updateItem,
  deleteItem,
} from "../lib/db";
import { Prisma, item } from "@prisma/client";
import { validateItem } from "../lib/validation.js";

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
  const companyId = req.params.companyId;
  const item = await getItemsInCompany(parseInt(companyId));

  if (!item) {
    return next(new Error("No items found"));
  }

  return res.json(item);
}

export async function createItemHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { name, price, amount, companyId, saleId, itemTypeId } = req.body;

  let itemCreated: item | null = null;
  try {
    itemCreated = await insertItem({ itemTypeId, companyId, saleId });
  } catch (err) {
    return next(err);
  }

  return res.status(201).json(itemCreated);
}

export async function updateItemHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = parseInt(req.params.id);
  const { companyId, saleId, itemTypeId } = req.body;

  let itemUpdated: item | null = null;
  try {
    itemUpdated = await updateItem(id, { itemTypeId, companyId, saleId });
  } catch (err) {
    return next(err);
  }

  return res.status(200).json(itemUpdated);
}

export async function deleteItemHandler(
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

/* Exports with middleware */

export const createItemMiddleware = [validateItem, createItemHandler].flat();
export const updateItemMiddleware = [validateItem, updateItemHandler].flat();