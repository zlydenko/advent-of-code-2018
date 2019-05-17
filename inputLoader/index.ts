const fs = require('fs');
const path = require('path');

const inputLoader = (folderName: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const inputPath = path.resolve(__dirname, '../', folderName, 'src', 'input.txt');
    fs.readFile(inputPath, (err: Error, data: Buffer) => {
      if (err) reject(err);

      resolve(data);
    });
  });

export default async function(folderName: string, fn: Function): Promise<string[]> {
  try {
    const data: Buffer = await inputLoader(folderName);

    return fn(data.toString());
  } catch (exception) {
    throw new Error(`Failed to load input data. ${exception.message}`);
  }
}
