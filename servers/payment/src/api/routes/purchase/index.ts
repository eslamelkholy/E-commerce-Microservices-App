import { requireAuthV2, validateRequest } from '@common-kitchen/common';
import { Router } from 'express';
import { body } from 'express-validator';
import { PurchaseController } from '../../../controller/PurchaseController';
const route = Router();

export const purchaseRoute = (app: Router): void => {
  const purchaseController = new PurchaseController();
  app.use('/purchase-cancel', route);

  route.post(
    '/',
    [body('id').isInt().withMessage('PurchaseId Must be Valid Integer')],
    validateRequest,
    requireAuthV2,
    purchaseController.cancelPurchase
  );
};
