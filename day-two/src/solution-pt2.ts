export const differedLetters = (first: string, second: string): number => {
  const splittedFirst = first.split("");
  const splittedSecond = second.split("");

  const differCharacters = splittedFirst.filter((character, idx) => splittedSecond[idx] !== character);

  return differCharacters.length;
};

export const findCorrectBoxesId = (ids: string[]): [string, string] => {
  return ["hello", "world"];
};

export const commonLetters = (ids: [string, string]): string => {
  return "oopsie";
};
