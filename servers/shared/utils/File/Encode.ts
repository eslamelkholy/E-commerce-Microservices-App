import fs from 'fs';
class Encoder {
  async Base64Encode(filePath: string) {
    return fs.readFileSync(filePath, { encoding: 'base64' });
  }
}
export default new Encoder();
