import ILogger from '../abstractions/ILogger';
import { createLogger, format, transports, Logger } from 'winston';
const { combine, timestamp, colorize, simple, errors } = format;

export default class LocalLogger implements ILogger {
  protected logger: Logger;

  constructor() {
    this.logger = createLogger(this.getLoggerOptions());
  }

  log(message: string): void {
    this.logger.info(message);
  }
  error(message: Error): void {
    this.logger.error(message);
  }

  getLoggerOptions(): object {
    const options = combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      simple(),
      colorize(),
      errors({ stack: true })
    );
    return {
      exitOnError: false,
      format: options,
      transports: [new transports.Console({ format: options })],
    };
  }
}
