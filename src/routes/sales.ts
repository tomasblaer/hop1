import { NextFunction, Request, Response } from "express";
import { createSale, deleteSale, getSale, getSales, updateSale } from "../lib/db";
import { sale } from "@prisma/client";

export async function listSalesInCompany(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> {
    const companyId = req.params.companyId;
    const sales = await getSales(parseInt(companyId));
  
    if (!sales) {
      return next(new Error("No saless found"));
    }
  
    return res.json(sales);
  }
  
export async function getSaleById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const id = req.params.id;
    const sale = await getSale(id);
  
    if (!sale) {
      return next(new Error("No company found"));
    }
  
}


export async function createSaleHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const {companyId, items } = req.body;
  
    let saleCreated: sale | null = null;
    try {
      saleCreated = await createSale({ items, companyId});
    } catch (err) {
      return next(err);
    }
  
    return res.status(201).json(saleCreated);
  
}

export async function updateSaleHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const id = req.params.id;
    const { items } = req.body;
  
    let saleUpdated: sale | null = null;
    try {
      saleUpdated = await updateSale (id, { items});
    } catch (err) {
      return next(err);
    }
  
    return res.status(200).json(saleUpdated);
  
}

export async function deleteSaleHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const id = req.params.id;
  
    let saleDeleted: sale | null = null;
    try {
        saleDeleted = await deleteSale(id);
    } catch (err) {
      return next(err);
    }
  
    return res.status(200).json(saleDeleted);
  }

