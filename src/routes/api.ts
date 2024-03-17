import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import {
  listItemsInSale,
  listItemsInCompany,
  addItem,
  editItem,
  removeItem,
} from "./items.js";
import {
  listCompanyById,
  createCompany,
  updateCompanyById,
  deleteCompanyById,
} from "./companies.js";

import { createUser, getUserByUsername } from './users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authenticateJWT, ensureAdmin, ensureCompany, ensureItemType, ensureItemTypeId, ensureSaleId, getSecretAssert } from '../lib/authorization.js';
import { createItemType, deleteItemTypeById, getItemTypeById, getItemTypesByCId, updateItemTypeById } from "./itemType.js";
import { deleteItemType, insertItemType } from "../lib/db.js";

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
      methods: ["POST", "PATCH", "DELETE"],
    },
    {
      href: "/items/sale/:saleId",
      methods: ["GET"],
    },
    {
      href: "/items/:companyId",
      methods: ["GET"],
    },
  ]);
}

router.get("/", index);

/* Auth */
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ message: "Username and password required" });
        return;
      }

      const preEx = await getUserByUsername(username);

      if (!preEx) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }
      const valid = await bcrypt.compare(password, preEx.password);
      if (valid) {
        const token = jwt.sign(
          {
            username: preEx.username,
            companyId: preEx.companyId,
            admin: preEx.isCompanyAdmin,
          },
          getSecretAssert()
        );
        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (e) {
      next(e);
    }
  }
);

/* Users */
router.post("/register", createUser); // Finna ut ur auth leið með þetta
router.post("initialRegister"); // Todo

/* Company routes */

router.get("/company/:id", authenticateJWT, ensureCompany, listCompanyById);
router.post("/company", createCompany);
router.patch("/company/:id", authenticateJWT, ensureAdmin, updateCompanyById);
router.delete("/company/:id", authenticateJWT, ensureAdmin, deleteCompanyById);



/* Item type routes */
router.get("/itemType/:itemTypeId", authenticateJWT, ensureItemType, getItemTypeById);
router.get("/itemType/:companyId", authenticateJWT, ensureCompany, getItemTypesByCId);
router.post("/itemType", authenticateJWT, createItemType);
router.patch("/itemType/:itemTypeId", authenticateJWT, ensureItemType, updateItemTypeById);
router.delete("/itemType/:itemTypeId", authenticateJWT, ensureItemType, deleteItemTypeById);

/* Item routes */

router.get(
  "/items/sale/:saleId",
  authenticateJWT,
  ensureSaleId,
  listItemsInSale
);
router.get(
  "/items/:companyId",
  authenticateJWT,
  ensureCompany,
  listItemsInCompany
);
router.post("/item", authenticateJWT, ensureItemTypeId, addItem);
router.patch("/item", authenticateJWT, ensureItemTypeId, editItem);
router.delete("/item", authenticateJWT, ensureItemTypeId, removeItem);
