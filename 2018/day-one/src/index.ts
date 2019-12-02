import inputLoader from '~root/inputLoader';

const STARTING_FREQUENCY: number = 0;

const dataLoader = async () => {
  return await inputLoader('day-one', (data: any) => {
    return data.toString().split('\r\n');
  });
};

const frequencyReducer = (acc: number, value: string) => (acc += Number(value));

const chronalCalibration = async (startingPoint: number): Promise<number> => {
  try {
    const frequencyData = await dataLoader();
    const resultingFrequency = frequencyData.reduce(frequencyReducer, startingPoint);

    return resultingFrequency;
  } catch (error) {
    throw new Error(error);
  }
};

const partOne = () => {
  chronalCalibration(STARTING_FREQUENCY)
    .then(result => console.log(`Resulting frequency: ${result}`))
    .catch(error => {
      console.log('Some troubles occured');
      console.error(error);
    });
};

//? PART TWO

export const findDuplicateFrequency = (inputData: string[], startingPoint: number): number => {
  const inputDataLen: number = inputData.length;
  let frequencies: number[] = [startingPoint];
  let duplicateFound: boolean = false;
  let duplicate: number = 0;

  while (!duplicateFound) {
    for (let i = 0; i < inputDataLen; i++) {
      const prevValue: number = frequencies[frequencies.length - 1];
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

const partTwo = () => {
  dataLoader()
    .then(res => {
      const result = findDuplicateFrequency(res, STARTING_FREQUENCY);
      console.log(`Resulting frequency: ${result}`);
    })
    .catch(error => {
      console.log('Some troubles occured');
      console.error(error);
    });
};
