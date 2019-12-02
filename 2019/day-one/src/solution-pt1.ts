const { readFile } = require("fs");

const readInput = (): Promise<number[]> =>
  new Promise((resolve, reject) => {
    readFile("./input.txt", (err: any, data: Buffer) => {
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
  const input = await readInput();
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
