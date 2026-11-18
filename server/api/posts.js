import { Router } from 'express';
import db from '.../db.js';
import authJWT from '.../middleware/authJWT.js';

const router = new Router();

//Return the public author details, with camelCase names for client
const commentQuery = function commentQuery() {
  return db ('comments')
  .join('users', 'comments.author_id', 'users.id')
  .select(
    'comments.id',
    'comments.content',
    'comments.created_at as createdAt',
    'users.fullname as authorName',
  );
};

//Validate :id parameters befroe running their router handlers
router.param('id', (req, res, next, value) => {
  if(!/^[1-9]\d*$/.test(value) || Number(value) > 2_147_483_647) {
    return res.status(400).json({ msg: 'Invalid Post ID.' });
  }

  return next();
});

//Return summaries for the homepage with the newest post first
router.get('/', (req, res) => {
  try {
  const post = await db('posts')
    .join('users', 'posts.author_id', 'users.id')
    .select(
      'posts.id',
      'posts.title',
      'posts.content',
      'posts.created_at as createdAt',
      'users.fullname as authorName',
    )
    .where('posts_id', Number(req.params.id))
    .first();
  
  if (!post) {
    return res.status(404).json({ msg: 'Post Not Found.' });
  }  

  return res.json({ post });
  } catch (error) {
  return next(error);
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
