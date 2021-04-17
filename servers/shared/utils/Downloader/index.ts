import HttpClient from '../HttpClient';
import { promisify } from 'util';
import { writeFile } from 'fs';

const writeFilePromise = promisify(writeFile);

class Downloader {
  async downloadFile(URL: string, FILE_NAME: string): Promise<ArrayBuffer> {
    const result = await HttpClient.sendRequest(URL);
    const binaryData = await result.arrayBuffer();
    writeFilePromise(FILE_NAME, Buffer.from(binaryData));
    return binaryData;
  }
}

export default new Downloader();
