import express from 'express';
import loaders from './src//loaders';

(async () => {
  const app = express();
  await loaders(app);
})();
