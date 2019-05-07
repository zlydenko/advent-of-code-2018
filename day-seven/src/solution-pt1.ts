//? again this TYPES can't get string[][]
export const parseInput = (input: string[]): (RegExpMatchArray | null)[] => {
  const regPattern = new RegExp(/(?<!^)[A-Z]/g);
  return input.map(str => str.match(regPattern));
};
