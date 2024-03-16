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
import { createUser, getUserByUsername } from './users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getSecretAssert } from '../lib/authorization.js';
import { user } from '@prisma/client';



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
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    let user: user | null = null;
    try {
      user = await getUserByUsername(username);
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }
    const valid = await bcrypt.compare(password, user?.password)
    if (valid) {
      const token = jwt.sign({ sub: username }, getSecretAssert());
      res.json({ token });
    }
  } else {
    res.status(400).json({ message: 'Username and password required' });
  }
});

/* Users */
router.post('/user', createUser);

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
