import { Router } from 'express';

const router = new Router();

router.post('/register', (req, res) => {
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
