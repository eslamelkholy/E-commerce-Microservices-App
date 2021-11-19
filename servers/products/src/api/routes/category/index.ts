import { Router } from 'express';
import { CategoryController } from '../../../controller/category';
import { body } from 'express-validator';
import { validateRequest } from '@common-kitchen/common';

const route = Router();

export const categoryRoute = (app: Router): void => {
  const categoryController = new CategoryController();
  app.use('/categories', route);

  route.get('/', categoryController.get);
  route.post(
    '/',
    [
      body('name').isLength({ min: 4, max: 200 }).withMessage('Name Min 4 and Max 200 Characters!'),
      body('description')
        .trim()
        .isLength({ min: 4, max: 60000 })
        .withMessage('Name Min 4 and Max 60000 Characters!'),
      body('status').trim().isLength({ min: 4, max: 200 }).withMessage('Name Min 4 and Max 200 Characters!'),
    ],
    validateRequest,
    categoryController.post
  );
};
