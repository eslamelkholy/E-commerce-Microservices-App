import { Router } from 'express';
import { purchaseRoute } from './routes/purchase';
import { walletRouter } from './routes/wallet';

// guaranteed to get dependencies
export default () => {
  const app = Router();

  purchaseRoute(app);
  walletRouter(app);
  return app;
};
