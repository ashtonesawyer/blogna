import { Router } from 'express';
import { matchedData } from 'express-validator';
import * as argon2 from 'argon2';
import db from '../db.js';
import validate from '../middleware/validator.js';
import { registerRules, loginRules } from '../middleware/authRules.js';

const router = new Router();
const DUMMY_HASH = argon2.hash('nope');

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

router.post('/login', loginRules, validate, async (req, res) => {
  const { email, password } = matchedData(req);

  const user = await db('users').select('passwd_hash').where({email}).first();
  const hash = user?.passwd_hash ?? DUMMY_HASH;
  const authd = await argon2.verify(hash ?? '', password);

  if (authd && user) {
    // todo: handle cookies + session things
    return res.json({ msg: 'todo: login to an account' });
  }
  
  return res.status(401).json({msg: 'incorrect email or password'});
});

router.post('/logout', (req, res) => {
  return res.json({ msg: 'todo: log out of logged in account' });
});

router.get('/me', (req, res) => {
  return res.json({ msg: 'todo: return details about logged in user' });
});

export default router;
