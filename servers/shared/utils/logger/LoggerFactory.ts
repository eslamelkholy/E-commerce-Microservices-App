import ILogger from './abstractions/ILogger';
import { Loggers } from './constants/loggers';
import CloudLogger from './loggers/CloudLogger';
import LocalLogger from './loggers/LocalLogger';

export default class LoggerFactory {
  getLogger(TYPE: string): ILogger {
    switch (TYPE) {
      case Loggers.LOCAL_LOGGER:
        return new LocalLogger();

      case Loggers.CLOUD_LOGGER:
        return new CloudLogger();
      default:
        return new CloudLogger();
    }
  }
}
