const findCommonLetters = (first: string[], second: string[]): string[] => {
  return first.reduce((acc: string[], current: string, idx: number) => {
    const isCommon: boolean = second[idx] === current;
    return isCommon ? [...acc, current] : acc;
  }, []);
};

export const findDifferCount = (first: string, second: string): number => {
  const [firstArr, secondArr]: [string[], string[]] = [first.split(""), second.split("")];

  const commonLetters = findCommonLetters(firstArr, secondArr);

  return first.length - commonLetters.length;
};
