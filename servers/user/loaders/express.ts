import { Application } from 'express';
import Logger from '../../shared/utils/logger/index';
import routes from '../api';
import cors from 'cors';
import config from '../config';
import expressRequestId from 'express-request-id';
import requestLogger from '../../shared/utils/logger/loggers/RequestLogger';
// import kafka from 'kafka-node';

export default ({ app }: { app: Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).send('It Works Fine');
  });

  app.use(expressRequestId());
  app.use(requestLogger);
  app.use(cors());
  app.use(routes());
  // const Producer = kafka.Producer;
  // const KeyedMsg = kafka.KeyedMessage;
  // const client = new kafka.KafkaClient();
  // const producer = new Producer(client);
  // const km = new KeyedMsg('key', 'message');
  // const payloads = [
  //   { topic: 'ecommerce-topic', messages: 'New Order Created', partition: 0 },
  //   // { topic: 'ecommerce-topic2', messages: ['hello', 'world', km], partition: 1 },
  // ];
  // producer.on('ready', function () {
  //   producer.send(payloads, function (err, data) {
  //     Logger.log('Sending Data Over Topic [ecommerce-topic] [ecommerce-topic2]');
  //   });
  // });

  // producer.on('error', function (err) {
  //   Logger.error(err);
  // });

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
      Logger.log(`🛡️ User Server listening on port: ${config.PORT} 🛡️`);
    })
    .on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
};
