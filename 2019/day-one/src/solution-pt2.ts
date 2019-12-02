const { readFile: readFilePt2 } = require("fs");

const readInputPt2 = (): Promise<number[]> =>
  new Promise((resolve, reject) => {
    readFilePt2("./input.txt", (err: any, data: Buffer) => {
      if (err) reject(err);

      const result: number[] = data
        .toString()
        .split("\r\n")
        .map((str: string) => Number(str));
      resolve(result);
    });
  });

const calculateModuleFuel = (mass: number) => {
  let totalFuel = 0;
  let lastFuel = mass;

  while (lastFuel > 0) {
    const fuel = Math.floor(lastFuel / 3) - 2;
    fuel > 0 ? (totalFuel += fuel) : null;
    lastFuel = fuel;
  }

  return totalFuel;
};

const getTotalModuleFuel = (total: number, moduleMass: number) => (total += calculateModuleFuel(moduleMass));

(async function() {
  try {
    const input = await readInputPt2();
    const solution = input.reduce(getTotalModuleFuel, 0);

    console.log(`SOLUTION: ${solution}`);
  } catch (error) {
    console.error(error);
  }
})();
