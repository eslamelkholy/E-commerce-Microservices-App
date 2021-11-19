import { Router } from 'express';
import { categoryRoute } from './routes/category';
import { productRoute } from './routes/product';
import { purchaseRoute } from './routes/purchase';

// guaranteed to get dependencies
export default () => {
  const app = Router();

  productRoute(app);
  categoryRoute(app);
  purchaseRoute(app);
  return app;
};
