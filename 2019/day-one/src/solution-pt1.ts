const { readFile: readFilePt1 } = require("fs");

const readInputPt1 = (): Promise<number[]> =>
  new Promise((resolve, reject) => {
    readFilePt1("./input.txt", (err: any, data: Buffer) => {
      if (err) reject(err);

      const result: number[] = data
        .toString()
        .split("\r\n")
        .map((str: string) => Number(str));
      resolve(result);
    });
  });

const calculateRequiredFuel = (mass: number) => Math.floor(mass / 3) - 2;
const fuelForEachModule = async (): Promise<number> => {
  const input = await readInputPt1();
  return input.reduce((totalFuel: number, moduleMass: number) => (totalFuel += calculateRequiredFuel(moduleMass)), 0);
};

(async function() {
  try {
    const solution = await fuelForEachModule();
    console.log(`SOLUTION: ${solution}`);
  } catch (error) {
    console.error(error);
  }
})();
