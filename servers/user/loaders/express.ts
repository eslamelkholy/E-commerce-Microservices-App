import { Application } from 'express';
import Logger from '../../shared/utils/logger/index';
import routes from '../api';
import cors from 'cors';
import config from '../config';
import expressRequestId from 'express-request-id';
import requestLogger from '../../shared/utils/logger/loggers/RequestLogger';

export default ({ app }: { app: Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).send('It Works Fine');
  });

  app.use(expressRequestId());
  app.use(requestLogger);
  app.use(cors());
  app.use(routes());

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
