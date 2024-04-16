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
  deleteCompany,
} from "./companies.js";
import { createUser, getUserByUsername } from "./users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  authenticateJWT,
  ensureAdmin,
  ensureCompany,
  ensureItemId,
  ensureItemTypeId,
  ensureSaleId,
  getSecretAssert,
} from "../lib/authorization.js";
import { upload } from "../lib/multer.js";
import {
  getItemTypeImage,
  getUserImage,
  uploadItemTypeImageHandler,
  uploadUserImageHandler,
} from "./images.js";
import { createItemType, deleteItemTypeById, getItemTypeById, getItemTypesByCId, updateItemTypeById } from "./itemType.js";

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
      href: "/item/:itemTypeId",
      methods: ["POST"],
    },
    {
      href: "/item/:itemId",
      methods: ["PATCH", "DELETE"],
    },
    {
      href: "/items/sale/:saleId",
      methods: ["GET"],
    },
    {
      href: "/items/:companyId",
      methods: ["GET"],
    },
    {
      href: "/itemType",
      methods: ["POST"],
    },
    {
      href: "/itemType/:itemTypeId",
      methods: ["GET", "PATCH", "DELETE"],
    },
    {
      href: "/itemType/:companyId",
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
router.post("/register", authenticateJWT, ensureAdmin, createUser);

/* Company routes */

router.get("/company", authenticateJWT, listCompanyById);
router.post("/company", createCompany);
router.patch("/company", authenticateJWT, ensureAdmin, updateCompanyById);
router.delete("/company", authenticateJWT, ensureAdmin, deleteCompany);

/* Item type routes */
router.get("/itemType/:itemTypeId", authenticateJWT, ensureItemTypeId, getItemTypeById);
router.get("/itemType", authenticateJWT, getItemTypesByCId);
router.post("/itemType", authenticateJWT, createItemType);
router.patch("/itemType/:itemTypeId", authenticateJWT, ensureItemTypeId, updateItemTypeById);
router.delete("/itemType/:itemTypeId", authenticateJWT, ensureItemTypeId, deleteItemTypeById);

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
  listItemsInCompany
);
router.post("/item/:itemTypeId", authenticateJWT, ensureItemTypeId, addItem);
router.patch("/item/:itemId", authenticateJWT, ensureItemId, editItem);
router.delete("/item/:itemId", authenticateJWT, ensureItemId, removeItem);

/* Images */
router.post(
  "/user/upload",
  authenticateJWT,
  upload.single("image"),
  uploadUserImageHandler
);

router.post(
  "/itemType/image/:itemTypeId",
  authenticateJWT,
  ensureItemTypeId,
  upload.single("image"),
  uploadItemTypeImageHandler
);

router.get("/user/image", authenticateJWT, getUserImage);
router.get("/itemType/image/:itemTypeId", authenticateJWT, ensureItemTypeId, getItemTypeImage);
