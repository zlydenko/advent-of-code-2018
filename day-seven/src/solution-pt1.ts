//? again this TYPES can't get string[][]
export const parseInput = (input: string[]): string[] => {
  const regPattern = new RegExp(/(?<!^)[A-Z]/g);
  return input.map(str => {
    const keys = str.match(regPattern);
    return keys === null ? "" : keys.join("");
  });
};
