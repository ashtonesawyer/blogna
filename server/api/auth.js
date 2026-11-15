import { Router } from 'express';
import * as argon2 from 'argon2';
import db from '../db.js';

const router = new Router();

router.post('/register', async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const { email, password, fullname } = req.body;

  const exists = await db('users').select('id').where('email', email.toLowerCase().trim()).first();
  if (exists) {
    return res.status(409).json({ error: 'email already in use' });
  }

  const hash = await argon2.hash(password);

  await db('users').insert({email, 'passwd_hash': hash, fullname});

  return res.json({ msg: 'todo: create an account' });
});

router.post('/login', (req, res) => {
  return res.json({ msg: 'todo: login to an account' });
});

router.post('/logout', (req, res) => {
  return res.json({ msg: 'todo: log out of logged in account' });
});

router.get('/me', (req, res) => {
  return res.json({ msg: 'todo: return details about logged in user' });
});

export default router;
