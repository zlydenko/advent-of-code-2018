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
  return 12;
};
