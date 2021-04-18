import { Router } from 'express';
import shopify from './routes/product';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  shopify(app);

  return app;
};
