const {
  intcodeComputer: intcodeComputerPt2,
  restoreGravityAssistProgram: restoreGravityAssistProgramPt2
} = require("./solution-pt1");
const { readFile: readFilePt2 } = require("fs");

const readInputPt2 = (): Promise<number[]> =>
  new Promise((resolve, reject) => {
    readFilePt2("./input.txt", (err: any, data: Buffer) => {
      if (err) reject(err);

      const result: number[] = data
        .toString()
        .split(",")
        .map((str: string) => Number(str));
      resolve(result);
    });
  });

const runProgram = (input: number[], noun: number, verb: number): number => {
  const memory = [...input];
  const restoredGravityAssistProgram = restoreGravityAssistProgramPt2(memory, noun, verb);
  const program = intcodeComputerPt2(restoredGravityAssistProgram);
  const output = program[0];

  return output;
};

const findNounAndVerb = (input: number[]): [number, number] => {
  let found = false;
  let nounResult = 0;
  let verbResult = 0;

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      if (!found) {
        const output = runProgram(input, noun, verb);
        if (output === 19690720) {
          found = true;
          nounResult = noun;
          verbResult = verb;
        }
      }
    }
  }

  return [nounResult, verbResult];
};

(async function() {
  try {
    const input = await readInputPt2();
    const [noun, verb] = findNounAndVerb(input);
    const solution = 100 * noun + verb;

    console.log(`Solution: ${solution}`);
  } catch (error) {
    console.error(error);
  }
})();
