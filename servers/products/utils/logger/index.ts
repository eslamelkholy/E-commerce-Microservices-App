import config from '../../config/index';
import ILogger from './abstractions/ILogger';
import LoggerFactory from './LoggerFactory';

class Logger {
  logger: ILogger;

  constructor() {
    this.logger = new LoggerFactory().getLogger(config.LOGGER);
  }

  log = (msg: string): void => this.logger.log(msg);

  error = (msg: Error, data?: any): void => this.logger.error(msg, data);
}

export default new Logger();
