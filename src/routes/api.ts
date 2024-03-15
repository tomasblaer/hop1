import express, { Request, Response } from "express";
import {
  listItemsInSale,
  listItemsInCompany,
  createItem,
  updateItemHandler,
  deleteItemHandler,
} from "./items.js";
import { 
  listCompanyById,
  createCompany,
  updateCompanyById,
  deleteCompanyById,
} from "./companies.js";


export const router = express.Router();

export async function index(req: Request, res: Response) {
  return res.json([
    {
      href: "/company",
      methods: ["POST"],
    },
    {
      href: "/company/:id",
      methods: ["GET", "PATCH", "DELETE"],
    },
    {
      href: "/item",
      methods: ["POST"],
    },
    {
      href: "/items/sale/:saleId",
      methods: ["GET"],
    },
    {
      href: "/items/:companyId",
      methods: ["GET", "PATCH", "DELETE"],
    },
  ]);
}

router.get("/", index);

/* Company routes */

router.get("/company/:id", listCompanyById);
router.post("/company", createCompany);
router.patch("/company/:id", updateCompanyById);
router.delete("/company/:id", deleteCompanyById);

/* Item routes */
router.get("/items/sale/:saleId", listItemsInSale);
router.get("/items/:companyId", listItemsInCompany);
router.post("/item", createItem);
router.patch("/item/:id", updateItemHandler);
router.delete("/item/:id", deleteItemHandler);