import { Router } from 'express';
import { purchaseRoute } from './routes/purchase';

// guaranteed to get dependencies
export default () => {
  const app = Router();

  purchaseRoute(app);
  return app;
};
