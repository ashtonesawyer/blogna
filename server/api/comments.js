import { Router } from 'express';
import db from '../db.js';
import authJWT from '../middleware/authJWT.js';
import { patchRules, deleteRules } from '../middleware/commentsRules.js';
import validate from '../middleware/validator.js';

const router = new Router();

router.patch('/:id', authJWT, patchRules, validate, async (req, res) => {
  const uid = Number(req.user.sub);
  const { id } = req.params;
  const comment = await db('comments').where({ id }).first();

  if (!comment) {
    return res.status(404).json({
      msg: 'Comment not found',
    });
  }

  if (uid !== comment.author_id) {
    return res.status(403).json({ msg: 'You do not have access to this resource' });
  }

  const { content } = req.body;
  const data = await db('comments')
    // eslint-disable-next-line camelcase
    .where({ id, author_id: uid })
    // eslint-disable-next-line camelcase
    .update({ content, updated_at: db.fn.now(0) }, ['id', 'content']);

  return res.status(200).json({ id: data[0].id, content: data[0].content });
});

router.delete('/:id', authJWT, deleteRules, validate, async (req, res) => {
  const uid = Number(req.user.sub);
  const { id } = req.params;
  const comment = await db('comments').where({ id }).first();

  if (!comment) {
    return res.status(404).json({
      msg: 'Comment not found',
    });
  }

  if (uid !== comment.author_id) {
    return res.status(403).json({ msg: 'You do not have access to this resource' });
  }

  const deleted = await db('comments').where({ id }).del(['id']);
  return res.status(200).json({ id: deleted[0].id });
});

export default router;
