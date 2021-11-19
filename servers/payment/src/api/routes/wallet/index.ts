import { requireAuthV2, validateRequest } from '@common-kitchen/common';
import { Router } from 'express';
import { body } from 'express-validator';
import { WalletController } from '../../../controller/WalletController';
const route = Router();

export const walletRouter = (app: Router): void => {
  const walletController = new WalletController();
  app.use('/wallet', route);

  route.post(
    '/',
    [
      body('email').isEmail().withMessage('Email must be valid'),
      body('userId')
        .trim()
        .isLength({ min: 4, max: 250 })
        .withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    requireAuthV2,
    walletController.post
  );
};
