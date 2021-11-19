import { requireAuthV2, validateRequest } from '@common-kitchen/common';
import { Router } from 'express';
import { body } from 'express-validator';
import { PurchaseController } from '../../../controller/purchase';
const route = Router();

export const purchaseRoute = (app: Router): void => {
  const purchaseController = new PurchaseController();
  app.use('/purchase', route);

  route.post(
    '/',
    [body('productId').isInt().withMessage('productId Must be Valid Integer')],
    validateRequest,
    requireAuthV2,
    purchaseController.post
  );
};
