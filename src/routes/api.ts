import express, { NextFunction, Request, Response } from "express";
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
import { authenticateJWT, ensureAdmin, ensureCompany, ensureItemTypeId, ensureSaleId, getSecretAssert } from '../lib/authorization.js';
import { upload } from "../lib/multer.js";
import { getItemTypeImage, getUserImage, uploadImageHandler } from "./images.js";

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
// router.post("/itemType", createItemType);
// router.patch("/itemType/:id", updateItemType);
// router.delete("/itemType/:id", deleteItemType);

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

/* Images */
router.post('/user/upload', authenticateJWT, upload.single('image'), uploadImageHandler);

router.get('/item/image/:itemTypeId', authenticateJWT, ensureItemTypeId, getItemTypeImage);

router.get('/user/image', authenticateJWT, getUserImage);