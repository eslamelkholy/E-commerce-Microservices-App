import 'reflect-metadata';
import { Application, Response, Request, NextFunction, json } from 'express';
import routes from '../api';
import cors from 'cors';
import config from '../config';
import expressRequestId from 'express-request-id';
import { AppLogger, errorHandler, NotFoundError, requestLogger } from '@common-kitchen/common';
// import KafkaConsumer from '../../shared/services/kafka/KafkaConsumer';

export default (app: Application) => {
  app.use(cors());
  app.get('/status', (req, res) =>
    res.status(200).send('[Product-Server] Fully Pipeline Works Now yaaaay 🚀🚀🔥🔥')
  );

  app.use(json());
  app.use(expressRequestId());
  app.use(requestLogger);
  app.use('/api/v1', routes());

  // KafkaConsumer.consumerInitializer();
  /// catch 404 and forward to error handler
  app.all('*', async (req, res) => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  process.on('uncaughtException', function (err) {
    console.log(err);
  });

  app.listen(config.PORT, () => AppLogger.log(`🛡️  [Product-Service] listening on port: ${config.PORT} 🛡️`));
};
