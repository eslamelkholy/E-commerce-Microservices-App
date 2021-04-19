import { Router } from 'express';
import { makeOrder } from '../../../controller/user';
const route = Router();

export default (app: Router) => {
  app.use('/order', route);

  route.post('/', makeOrder);
};
