import express from 'express';
import { requireAuthV2 } from '@common-kitchen/common';

const router = express.Router();

router.get('/api/users/currentuser', requireAuthV2, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
