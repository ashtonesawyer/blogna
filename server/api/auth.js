import { Router } from 'express';
import { matchedData } from 'express-validator';
import * as argon2 from 'argon2';
import db from '../db.js';
import validate from '../middleware/validator.js';
import { registerRules } from '../middleware/authRules.js';

const router = new Router();

router.post('/register', registerRules, validate, async (req, res) => {
  const { email, password, fullname } = matchedData(req);

  const hash = await argon2.hash(password);
  
  try {
    await db('users').insert({email, 'passwd_hash': hash, fullname});
  } catch(err) {
    console.log(err);
  }

  return res.status(201).json({ msg: 'user registered' });
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
