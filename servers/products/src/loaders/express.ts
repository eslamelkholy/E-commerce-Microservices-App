import 'reflect-metadata';
import { Application, Response, Request, NextFunction } from 'express';
import routes from '../api';
import cors from 'cors';
import config from '../config';
import expressRequestId from 'express-request-id';
import { AppLogger, requestLogger } from '@common-kitchen/common';
// import KafkaConsumer from '../../shared/services/kafka/KafkaConsumer';

export default (app: Application) => {
  app.get('/status', (req, res) =>
    res.status(200).send('[Product-Server] Fully Pipeline Works Now yaaaay 🚀🚀🔥🔥')
  );

  app.use(expressRequestId());
  app.use(requestLogger);
  app.use(cors());
  app.use('/api/v1', routes());
  // KafkaConsumer.consumerInitializer();
  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error('Not Found');
    next({ ...err, status: 404 });
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
  app
    .listen(config.PORT, () => AppLogger.log(`🛡️  Server listening on port: ${config.PORT} 🛡️`))
    .on('error', (err) => {
      AppLogger.error(err);
      process.exit(1);
    });
};
