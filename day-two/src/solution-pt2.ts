export const differedLetters = (first: string, second: string): number => {
  const splittedFirst = first.split("");
  const splittedSecond = second.split("");

  const differCharacters = splittedFirst.filter((character, idx) => splittedSecond[idx] !== character);

  return differCharacters.length;
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const findLikelyPairsId = (testingId: string, testingIdIdx: number, allIds: string[]): (string | number)[][] => {
  const result = allIds
    .map((comparingId: string, comparingIdIdx: number) => {
      if (comparingIdIdx === testingIdIdx) return null;

      const difference: number = differedLetters(testingId, comparingId);
      const approvedDiffer: boolean = difference <= testingId.length - 1;
      return approvedDiffer ? [testingId, comparingId, difference] : null;
    })
    .filter(notEmpty);

  return result;
};

export const likelyListReducer = (acc: any[], value: any[]): (string | number)[] => {
  return acc[2] ? (acc[2] > value[2] ? [...value] : [...acc]) : [...value];
};

export const findCorrectBoxesId = (ids: string[]) => {
  let likelyList: (string | number)[][] = ids.map((value: string, idx: number) => {
    const allLikelyVariants: (string | number)[][] = findLikelyPairsId(value, idx, ids);
    const reduced: (string | number)[] = allLikelyVariants.reduce(likelyListReducer, []);

    return reduced;
  });

  const result = likelyList.map(([first, second, _diff]) => [first, second]);

  // return ["asdas"];
  return result.flat(1);
};

export const commonLetters = (ids: any): string => {
  return "oopsie";
};
