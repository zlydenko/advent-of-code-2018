const findCommonLetters = (first: string[], second: string[]): string[] => {
  return first.reduce((acc: string[], current: string, idx: number) => {
    const isCommon: boolean = second[idx] === current;
    return isCommon ? [...acc, current] : acc;
  }, []);
};

export const getCommonLetters = (ids: [string, string]): string => {
  return findCommonLetters(ids[0].split(""), ids[1].split("")).join("");
};

export const findDifferCount = (first: string, second: string): number => {
  const [firstArr, secondArr]: [string[], string[]] = [first.split(""), second.split("")];
  const commonLetters = findCommonLetters(firstArr, secondArr);

  return first.length - commonLetters.length;
};

export const findCorrectBoxIds = (ids: string[]): [string, string] => {
  const result: [string, string] = ids.reduce((acc: any, currentId: string, idx: number) => {
    const otherIds: string[] = [...ids];
    otherIds.splice(idx + 1, 1);

    const filtered = otherIds.filter((testingId: string) => findDifferCount(currentId, testingId) === 1);
    const foundCorrect = filtered.length === 1;

    return foundCorrect ? [currentId, filtered[0]] : acc;
  }, []);

  return result;
};
