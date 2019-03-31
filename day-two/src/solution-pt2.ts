export const differedLetters = (first: string, second: string): number => {
  const splittedFirst = first.split("");
  const splittedSecond = second.split("");

  const differCharacters = splittedFirst.filter((character, idx) => splittedSecond[idx] !== character);

  return differCharacters.length;
};

export const findLikelyPairsId = (testingId: string, testingIdIdx: number, allIds: string[]) => {
  return [
    ...allIds
      .map((comparingId: string, comparingIdIdx: number) => {
        if (comparingIdIdx === testingIdIdx) return null;

        const difference = differedLetters(testingId, comparingId);
        const approvedDiffer = difference <= testingId.length - 1;
        return approvedDiffer ? [testingId, comparingId, difference] : null;
      })
      .filter(value => value !== null)
  ];
};

export const findCorrectBoxesId = (ids: string[]): [string, string] => {
  let likelyList: Array<[string, string, number]> = [];

  ids.forEach((id: string, idx: number) => {
    const likelyPairs = ids
      .map((comparingId: string, comparingIdIdx: number) => {
        if (comparingIdIdx === idx) return null;

        const similarity = differedLetters(id, comparingId);

        return similarity >= 1 ? [id, comparingId, similarity] : null;
      })
      .filter(value => value !== null);
  });

  return ["hello", "world"];
};

export const commonLetters = (ids: [string, string]): string => {
  return "oopsie";
};
