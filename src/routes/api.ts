import express from 'express';
import { createUser, getUserByUsername } from './users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getSecretAssert } from '../lib/authorization.js';
import { user } from '@prisma/client';

export const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'WIP' });
});

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