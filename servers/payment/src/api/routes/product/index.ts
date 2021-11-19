import { validateRequest } from '@common-kitchen/common';
import { Router } from 'express';
import { body } from 'express-validator';
import { ProductController } from '../../../controller/product';
const route = Router();

export const productRoute = (app: Router): void => {
  const productController = new ProductController();
  app.use('/products', route);

  route.get('/', productController.get);
  route.post(
    '/',
    [
      body('name').isLength({ min: 4, max: 200 }).withMessage('Name Min 4 and Max 200 Characters!'),
      body('description')
        .trim()
        .isLength({ min: 4, max: 60000 })
        .withMessage('Name Min 4 and Max 60000 Characters!'),
      body('status').trim().isLength({ min: 4, max: 200 }).withMessage('Name Min 4 and Max 200 Characters!'),
      body('price').isInt().withMessage('Price Must be Valid Integer'),
      body('categoryId').isInt().withMessage('categoryId Must be Valid Integer'),
    ],
    validateRequest,
    productController.post
  );
};
