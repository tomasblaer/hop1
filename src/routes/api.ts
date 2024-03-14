import express from 'express';
import { createUser } from './users.js';

export const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'WIP' });
});

/* Users */
router.post('/user', createUser);