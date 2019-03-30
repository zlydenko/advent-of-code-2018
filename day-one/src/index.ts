import * as fs from "fs";
import * as path from "path";

const inputFilePath: string = path.resolve(__dirname, "../", "input.txt");

const STARTING_FREQUENCY: number = 0;

const extractInputData = (inputPath: string): Promise<string[]> =>
  new Promise((resolve, reject) => {
    fs.readFile(inputPath, (err, data) => {
      if (err) reject(err);

      resolve(data.toString().split("\r\n"));
    });
  });

const frequencyReducer = (acc: number, value: string) => (acc += Number(value));

const chronalCalibration = async (pathToInput: string, startingPoint: number): Promise<number> => {
  try {
    const frequencyData = await extractInputData(pathToInput);
    const resultingFrequency = frequencyData.reduce(frequencyReducer, startingPoint);

    return resultingFrequency;
  } catch (error) {
    throw new Error(error);
  }
};

chronalCalibration(inputFilePath, STARTING_FREQUENCY)
  .then(result => console.log(`Resulting frequency: ${result}`))
  .catch(error => {
    console.log("Some troubles occured");
    console.error(error);
  });
