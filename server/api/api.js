import { Router } from 'express';
import postsRouter from './posts.js';
import commentsRouter from './comments.js';
import authRouter from './auth.js';

const router = new Router();

router.get('/status', (_req, res) => {
  res.status(200).json({ status: 'healthy' });
});

router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/auth', authRouter);

export default router;
