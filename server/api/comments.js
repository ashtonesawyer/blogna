import { Router } from 'express';

const router = Router();

router.patch('/:id', (req, res) => {
  return res.json({ msg: 'todo: edit one comment by id' });
});

router.delete('/:id', (req, res) => {
  return res.json({ msg: 'todo: delete one comment by id' });
});

export default router;
