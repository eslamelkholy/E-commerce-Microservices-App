import { Router } from 'express';
import { productRoute } from './routes/product';

// guaranteed to get dependencies
export default () => {
  const app = Router();

  productRoute(app);

  return app;
};
