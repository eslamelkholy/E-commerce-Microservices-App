import { Application } from 'express';
import Logger from '../../shared/utils/logger/index';
import routes from '../api';
import cors from 'cors';
import config from '../config';
import expressRequestId from 'express-request-id';
import requestLogger from '../../shared/utils/logger/loggers/RequestLogger';
import kafka from 'kafka-node';

export default ({ app }: { app: Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).send('It Works Fine');
  });

  app.use(expressRequestId());
  app.use(requestLogger);
  app.use(cors());
  app.use(routes());

  var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(
      client,
      [
        { topic: 'ecommerce-topic', partitions: 0 },
        { topic: 'ecommerce-topic2', partitions: 1 },
      ],
      {
        autoCommit: false,
      }
    );
  consumer.on('message', function (message) {
    console.log('Consumerrrrrrrrr GET Message');
    console.log(message);
  });
  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
  app
    .listen(config.PORT, () => {
      Logger.log(`🛡️ Product Server listening on port: ${config.PORT} 🛡️`);
    })
    .on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
};
