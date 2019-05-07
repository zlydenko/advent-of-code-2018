//? again this TYPES can't get string[][]
export const parseInput = (input: string[]): string[] => {
  const regPattern = new RegExp(/(?<!^)[A-Z]/g);
  return input.map(str => {
    const keys = str.match(regPattern);
    return keys === null ? '' : keys.join('');
  });
};

export const sortInput = (data: string[]): string[] => {
  return data.sort((a: string, b: string) => {
    return a.charCodeAt(0) - b.charCodeAt(0) === 0 ? a.charCodeAt(1) - b.charCodeAt(1) : a.charCodeAt(0) - b.charCodeAt(0);
  });
};
