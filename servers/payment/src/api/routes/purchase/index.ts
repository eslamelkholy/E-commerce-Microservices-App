import { requireAuthV2, validateRequest } from '@common-kitchen/common';
import { Router } from 'express';
import { body } from 'express-validator';
import { PurchaseController } from '../../../controller/PurchaseController';
const route = Router();

export const purchaseRoute = (app: Router): void => {
  const purchaseController = new PurchaseController();
  app.use('/', route);

  route.get('/purchase', requireAuthV2, purchaseController.getUserPurchase);

  route.post(
    '/purchase-cancel',
    [body('id').isInt().withMessage('PurchaseId Must be Valid Integer')],
    validateRequest,
    requireAuthV2,
    purchaseController.cancelPurchase
  );
};
