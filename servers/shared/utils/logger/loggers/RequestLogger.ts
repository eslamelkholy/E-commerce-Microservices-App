import morgan from 'morgan';
import Logger from '../index';

const format = ':requestId :method :url :status :response-time ms';

morgan.token('requestId', (request: any) => request.id);

const options = {
  stream: {
    write: (message) => Logger.log(message.trim()),
  },
};

export default morgan(format, options);
