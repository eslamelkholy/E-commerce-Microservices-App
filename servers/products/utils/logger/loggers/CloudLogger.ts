import httpClient from '../../HttpClient';
import { Server, LogLevels } from '../constants/server';
import { HttpMethods } from '../../HttpClient/methods';
import config from '../../../config/index';
import LocalLogger from './LocalLogger';

export default class CloudLogger extends LocalLogger {
  error(message: Error, data?: any) {
    this.logger.error(message);
    this.sendLogToCloud(message, data);
  }
  async sendLogToCloud(message: Error, data?: any) {
    await httpClient.sendRequest(this.getUrl(), this.getLogsOptions(message, data));
  }

  getLogsOptions(message: Error, data?: any) {
    return {
      method: HttpMethods.POST,
      body: JSON.stringify({
        level: LogLevels.ERROR,
        message: message.stack,
        meta: {
          hostname: Server.HOST,
          service: Server.NAME,
          ddtags: data ? `appId:${data.objectId},env:${config.NODE_ENV}` : `appId:none,env:${config.NODE_ENV}`,
          ddsource: Server.LANG,
          data,
        },
      }),
      headers: {
        'X-Parse-Application-Id': config.APP_ID,
      },
    };
  }

  getUrl(): string {
    return `${config.PARSE_URL}/functions/addLog`;
  }
}
