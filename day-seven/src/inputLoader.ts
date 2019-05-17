const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');

const inputLoader = (): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    fs.readFile(inputPath, (err: Error, data: Buffer) => {
      if (err) reject(err);

      resolve(data);
    });
  });

//! why i cant choose type Promise<Array<[string,string]>>
export default async function(): Promise<string[]> {
  try {
    const data: Buffer = await inputLoader();
    const dataInString: string[] = data.toString().split('\n');

    return dataInString;
  } catch (exception) {
    throw new Error(`Failed to load input data. ${exception.message}`);
  }
}
