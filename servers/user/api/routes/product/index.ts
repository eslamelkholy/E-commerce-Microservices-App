import { Router } from 'express';
import { get } from '../../../controller/product';
const route = Router();

export default (app: Router) => {
  app.use('/product', route);

  route.get('/', get);
};
