import express from 'express';
import loaders from './loaders';

(async () => {
  const app = express();
  await loaders({ expressApp: app });
})();
