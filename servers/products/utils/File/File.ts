import fse from 'fs-extra';

class File {
  async readFromFile(filePath: string): Promise<any> {
    await fse.readFile(filePath);
  }

  async deleteDirectory(filePath: string) {
    await fse.remove(filePath);
  }

  async makeDirectory(filePath: string) {
    await fse.ensureDir(filePath);
  }

  async writeToFile(filePath: string, data: string) {
    await fse.outputFile(filePath, data);
  }

  renameDirectory(oldPath: string, newPath: string) {
    fse.renameSync(oldPath, newPath);
  }
}

export default new File();
