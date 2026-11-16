import { Router } from 'express';
import { matchedData } from 'express-validator';
import jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import * as dotenv from 'dotenv';
import db from '../db.js';
import validate from '../middleware/validator.js';
import { registerRules, loginRules } from '../middleware/authRules.js';

const router = new Router();

dotenv.config();

const DUMMY_HASH = argon2.hash('nope'); // always check passwd to prevent timing attacks
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT secret not configured');
}

router.post('/register', registerRules, validate, async (req, res) => {
  const { email, password, fullname } = matchedData(req);

  const hash = await argon2.hash(password);

  try {
    // eslint-disable-next-line camelcase
    await db('users').insert({ email, passwd_hash: hash, fullname });
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ msg: 'user registered' });
});

router.post('/login', loginRules, validate, async (req, res) => {
  const { email, password } = matchedData(req);

  const user = await db('users').select('id', 'passwd_hash').where({ email }).first();
  const hash = user?.passwd_hash ?? DUMMY_HASH;
  const authd = await argon2.verify(hash, password);

  if (authd && user) {
    const token = jwt.sign({}, JWT_SECRET, {
      subject: user.id.toString(),
      expiresIn: '15m',
      issuer: 'blogna-api',
      audience: 'blogna',
      algorithm: 'HS256',
    });
    res.cookie('session', token, {
      maxAge: 60 * 15 * 1000, // 15m in ms
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production', // only require https in prod
    });
    return res.json({ msg: 'successfully logged in' });
  }

  return res.status(401).json({ msg: 'incorrect email or password' });
});

router.post('/logout', (req, res) => {
  const token = req.cookies.session;

  if (!token) {
    return res.status(200).json({ msg: 'already logged out' });
  }

  // clearCookie options must match options cookie was set with
  res.clearCookie('session', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  
  return res.status(200).json({ msg: 'successfully logged out' });
});

router.get('/me', (req, res) => {
  return res.json({ msg: 'todo: return details about logged in user' });
});

export default router;
