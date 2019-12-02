const { readFile: readFilePt1 } = require("fs");
const assert = require("assert");

const readInputPt1 = (): Promise<number[]> =>
  new Promise((resolve, reject) => {
    readFilePt1("./input.txt", (err: any, data: Buffer) => {
      if (err) reject(err);

      const result: number[] = data
        .toString()
        .split(",")
        .map((str: string) => Number(str));
      resolve(result);
    });
  });

const opCodes: { [key: number]: string } = {
  1: "sum",
  2: "mul",
  99: "halt"
};

const sum = (pos1: number, pos2: number, outputPos: number, arr: number[]): number[] => {
  const value1 = arr[pos1];
  const value2 = arr[pos2];
  const sum = value1 + value2;
  const result = [...arr.slice(0, outputPos), sum, ...arr.slice(outputPos + 1)];

  return result;
};

const mul = (pos1: number, pos2: number, outputPos: number, arr: number[]): number[] => {
  const value1 = arr[pos1];
  const value2 = arr[pos2];
  const mul = value1 * value2;
  const result = [...arr.slice(0, outputPos), mul, ...arr.slice(outputPos + 1)];

  return result;
};

const functions: { [key: string]: Function } = {
  sum,
  mul
};

const intcodeComputer = (input: number[]): number[] => {
  let currentPosition = 0;
  let program: number[] = [...input];

  while (true) {
    const opCode = program[currentPosition] in opCodes ? opCodes[program[currentPosition]] : null;
    const haltCode = opCode === "halt";

    if (haltCode) break;
    if (!opCode) throw new Error(`There is no opcode as ${program[currentPosition]}`);

    const pos1 = program[currentPosition + 1];
    const pos2 = program[currentPosition + 2];
    const outputPos = program[currentPosition + 3];
    const fn = functions[opCode];

    program = fn(pos1, pos2, outputPos, program);
    const newPosition = currentPosition + 4;
    if (newPosition > input.length)
      throw new Error("Something went wrong!!! Reached end of the program and still not halts");
    currentPosition = newPosition;
  }

  // console.log("PROGRAM FINISHED");
  return program;
};

/*
TESTS

const tests = [
  [1, 0, 0, 0, 99],
  [2, 3, 0, 3, 99],
  [2, 4, 4, 5, 99, 0],
  [1, 1, 1, 4, 99, 5, 6, 0, 99],
  [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]
];

const results = [
  [2, 0, 0, 0, 99],
  [2, 3, 0, 6, 99],
  [2, 4, 4, 5, 99, 9801],
  [30, 1, 1, 4, 2, 5, 6, 0, 99],
  [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
];

assert.deepStrictEqual(results[0], intcodeComputer(tests[0]));
assert.deepStrictEqual(results[1], intcodeComputer(tests[1]));
assert.deepStrictEqual(results[2], intcodeComputer(tests[2]));
assert.deepStrictEqual(results[3], intcodeComputer(tests[3]));
assert.deepStrictEqual(results[4], intcodeComputer(tests[4]));

*/

const restoreGravityAssistProgram = (input: number[], value1: number, value2: number): number[] => [
  ...input.slice(0, 1),
  value1,
  value2,
  ...input.slice(3)
];

// (async function() {
//   try {
//     const input = await readInputPt1();
//     const restoredGravityAssistProgram = restoreGravityAssistProgram(input, 12, 2);
//     const program = intcodeComputer(restoredGravityAssistProgram);
//     const solution = program[0];

//     console.log(`SOLUTION: ${solution}`);
//   } catch (error) {
//     console.error(error);
//   }
// })();

module.exports = {
  intcodeComputer,
  restoreGravityAssistProgram
};
