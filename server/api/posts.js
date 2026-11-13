import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  return res.json({ msg: 'todo: get all posts' });
});

router.get('/:id', (req, res) => {
  return res.json({ msg: 'todo: get one post by id' });
});

router.post('/', (req, res) => {
  return res.json({ msg: 'todo: create a post' });
});

router.delete('/:id', (req, res) => {
  return res.json({ msg: 'todo: delete one post by id' });
});

router.patch('/:id', (req, res) => {
  return res.json({ msg: 'todo: edit one post by id' });
});

// ---- Comments ----

router.get('/:id/comments', (req, res) => {
  return res.json({ msg: 'todo: get all comments under one post' });
});

router.post('/:id/comments', (req, res) => {
  return res.json({ msg: 'todo: create a comment under one post' });
});

export default router;
