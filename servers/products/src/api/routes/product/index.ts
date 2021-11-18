import { Router } from 'express';
import { ProductController } from '../../../controller/product';
const route = Router();

export const productRoute = (app: Router): void => {
  const productController = new ProductController();
  app.use('/products', route);

  route.get('/', productController.get);
};
