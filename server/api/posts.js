import { Router } from 'express';
import db from '../db.js';
import authJWT from '../middleware/authJWT.js';

const router = new Router();

/*
 * Build the shared query for comment records and their public author details.
 * SQL aliases provide camelCase property names for the React components.
 */
const commentQuery = function commentQuery() {
  return db('comments')
    .join('users', 'comments.author_id', 'users.id')
    .select(
      'comments.id',
      'comments.content',
      'comments.created_at as createdAt',
      'users.fullname as authorName',
    );
};

/*
 * Validate :id parameters before running their route handlers.
 * The existing database uses positive PostgreSQL integer IDs.
 */
router.param('id', (req, res, next, value) => {
  if (!/^[1-9]\d*$/.test(value) || Number(value) > 2_147_483_647) {
    return res.status(400).json({ msg: 'Invalid post ID.' });
  }

  return next();
});

// Return homepage summaries, with the newest posts first.
router.get('/', async (req, res, next) => {
  try {
    const posts = await db('posts')
      .join('users', 'posts.author_id', 'users.id')
      .select(
        'posts.id',
        'posts.title',
        'posts.created_at as createdAt',
        'users.fullname as authorName',
        // Return a short excerpt for the homepage cards.
        db.raw('left(??, ?) as ??', ['posts.content', 160, 'excerpt']),
      )
      .orderBy('posts.created_at', 'desc')
      .orderBy('posts.id', 'desc');

    return res.json({ posts });
  } catch (error) {
    return next(error);
  }
});

// Return the complete article for the single-post view.
router.get('/:id', async (req, res, next) => {
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
      .where('posts.id', Number(req.params.id))
      .first();

    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' });
    }

    return res.json({ post });
  } catch (error) {
    return next(error);
  }
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

// Return this post's comments in chronological order.
router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await db('posts').where('id', Number(req.params.id)).first('id');

    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' });
    }

    const comments = await commentQuery()
      .where('comments.post_id', post.id)
      .orderBy('comments.created_at', 'asc')
      .orderBy('comments.id', 'asc');

    return res.json({ comments });
  } catch (error) {
    return next(error);
  }
});

/*
 * Require the existing JWT session before accepting a comment.
 * The authenticated user determines the author of the saved record.
 */
router.post('/:id/comments', authJWT, async (req, res, next) => {
  const content = typeof req.body?.content === 'string' ? req.body.content.trim() : '';

  // Match the existing VARCHAR(255) comments.content column.
  if (!content || content.length > 255) {
    return res.status(400).json({
      msg: 'Write a comment between 1 and 255 characters.',
    });
  }

  try {
    const post = await db('posts').where('id', Number(req.params.id)).first('id');

    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' });
    }

    // Use the verified token subject, rather than accepting an author ID.
    const user = await db('users').where('id', Number(req.user.sub)).first('id');

    if (!user) {
      return res.status(401).json({ msg: 'Please sign in again.' });
    }

    const [created] = await db('comments')
      .insert({
        content,
        // Database column names follow the existing migration.
        // eslint-disable-next-line camelcase
        author_id: user.id,
        // eslint-disable-next-line camelcase
        post_id: post.id,
      })
      .returning('id');

    // Include author details so React can display the new comment immediately.
    const comment = await commentQuery().where('comments.id', created.id).first();

    return res.status(201).json({ comment });
  } catch (error) {
    return next(error);
  }
});

// Return a generic JSON error while logging details on the server.
router.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error);

  return res.status(500).json({
    msg: 'Unable to process the post request. Please try again.',
  });
});

export default router;
