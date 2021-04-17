import fetch, { RequestInit } from 'node-fetch';

class HttpClient {
  async sendRequest(url: string, options?: RequestInit): Promise<any> {
    return await fetch(url, options);
  }
}

export default new HttpClient();
