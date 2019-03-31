const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "input.txt");

const inputLoader = (): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    fs.readFile(inputPath, (err: Error, data: Buffer) => {
      if (err) reject(err);

      resolve(data);
    });
  });

module.exports = async (): Promise<string[]> => {
  try {
    const data: Buffer = await inputLoader();
    const dataInString: string = data.toString();
    const parsed = dataInString.split("\r\n");

    return parsed;
  } catch (exception) {
    throw new Error(`Failed to load input data. ${exception.message}`);
  }
};
