import inputData from "./inputLoader";

export const scanBoxId = (id: string): [number, number] => {
  const splittedId = id.split("");
  let result: [number, number] = [0, 0];

  splittedId.forEach((letter: string) => {
    if (result[0] === 1 && result[1] === 1) return;

    const duplicates = splittedId.filter((n: string) => n === letter);

    switch (duplicates.length) {
      case 3:
        result[1] = 1;
        break;
      case 2:
        result[0] = 1;
        break;
    }
  });

  return result;
};

export const boxIdChecksum = (input: string[]): number => {
  const scanningResult: Array<[number, number]> = input.map((boxId: string) => scanBoxId(boxId));

  //? typescript is yelling on me about making acc, val, and result of duplicatesCounter of type [number,number]
  //? little annoying shit

  const checksumReducer = (acc: number[], value: number[]) => [acc[0] + value[0], acc[1] + value[1]];
  const duplicatesCounter: number[] = scanningResult.reduce(checksumReducer, [0, 0]);
  const checksum: number = duplicatesCounter[0] * duplicatesCounter[1];

  return checksum;
};

inputData().then(input => {
  const solutionAnswer = boxIdChecksum(input);
  console.log(`Answer is: ${solutionAnswer}`);
});
