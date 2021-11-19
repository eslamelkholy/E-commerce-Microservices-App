import { Router } from 'express';
import { categoryRoute } from './routes/category';
import { productRoute } from './routes/product';

// guaranteed to get dependencies
export default () => {
  const app = Router();

  productRoute(app);
  categoryRoute(app);

  return app;
};
