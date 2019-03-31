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

const partOne = () => {
  chronalCalibration(inputFilePath, STARTING_FREQUENCY)
    .then(result => console.log(`Resulting frequency: ${result}`))
    .catch(error => {
      console.log("Some troubles occured");
      console.error(error);
    });
};

//? PART TWO

const findDuplicateFrequency = (inputData: string[], startingPoint: number): number => {
  const inputDataLen: number = inputData.length;
  let frequencies: number[] = [];
  let duplicateFound: boolean = false;
  let iterationCycle: number = 1;
  let duplicate: number = 0;

  while (!duplicateFound) {
    for (let i = 0; i < inputDataLen; i++) {
      const prevValue: number = frequencies[frequencies.length - 1] ? frequencies[frequencies.length - 1] : startingPoint;
      const currentValue: number = prevValue + Number(inputData[i]);
      const haveDuplicate: boolean = frequencies.find(x => x === currentValue) !== undefined;

      if (haveDuplicate) {
        duplicate = currentValue;
        duplicateFound = true;
        break;
      } else {
        frequencies.push(currentValue);
      }
    }

    if (duplicateFound) {
      break;
    }
  }

  return duplicate;
};

extractInputData(inputFilePath)
  .then(res => {
    const x = findDuplicateFrequency(res, STARTING_FREQUENCY);
    console.log(x);
  })
  .catch(e => console.log(e));

const partTwo = () => {
  extractInputData(inputFilePath)
    .then(res => {
      const result = findDuplicateFrequency(res, STARTING_FREQUENCY);
      console.log(`Resulting frequency: ${result}`);
    })
    .catch(error => {
      console.log("Some troubles occured");
      console.error(error);
    });
};
