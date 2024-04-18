import { NextFunction, Request, Response } from "express";
import { createSale, deleteSale, getSale, getSales, updateSale } from "../lib/db.js";
import { item, sale } from "@prisma/client";
import { getCompanyId } from "../lib/util.js";

export async function listSalesInCompany(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> {
    const companyId = getCompanyId(req);
    const sales = await getSales(companyId);
  
    if (!sales) {
      return next(new Error("No sales found"));
    }
  
    return res.json(sales);
  }
  
export async function getSaleById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const id = req.params.saleId;
    const sale = await getSale(id);
  
    if (!sale) {
      return next(new Error("No sale found"));
    }

    return res.json(sale);
  
}


export async function createSaleHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const { items } = req.body;
    const companyId = getCompanyId(req);
  
    let saleCreated: sale | null = null;
    try {
      saleCreated = await createSale(companyId, items);
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

