import { Router } from 'express';
import { get } from '../../../controller/product';
const route = Router();

export const productRoute = (app: Router): void => {
  app.use('/products', route);

  route.get('/', get);
};
