function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const findDifferChars = (first: string, second: string): string[] => {
  const firstLetters: string[] = first.split("");
  const secondLetters: string[] = second.split("");

  const allUnique: Set<string> = new Set([...firstLetters, ...secondLetters]);

  let result: string[] = [];

  allUnique.forEach(value => {
    if (
      (firstLetters.includes(value) && !secondLetters.includes(value)) ||
      (!firstLetters.includes(value) && secondLetters.includes(value))
    ) {
      result.push(value);
    }
  });

  return result;
};

export const sliceDiffer = (input: string, chars: string[]): string => {
  return input
    .split("")
    .filter(letter => !chars.includes(letter))
    .join("");
};

interface Answer {
  ids: string[];
  commonCharacters: string;
}

export const findCorrectBoxIds = (ids: string[]): string[] => {
  let result: string[] = [];

  ids.forEach((currentId: string, idx: number, allIds: string[]) => {
    const testingIds = allIds.slice(idx);
    const correctBoxIds: string[] = testingIds.reduce((acc: string[], testedId: string) => {
      console.log(`testing value ${currentId} and ${testedId}`);
      const differChars = findDifferChars(currentId, testedId);
      console.log(`count of differ chars: ${differChars.length / 2}`);
      const isValid = differChars.length / 2 === 1;
      return isValid ? [currentId, testedId] : acc;
    }, []);

    if (correctBoxIds.length > 0) {
      result = correctBoxIds;
      console.log("result found, breaking loop");
      return;
    }
  });

  return result;
};

export const findSolution = (data: string[]): Answer => {
  const [firstId, secondId] = findCorrectBoxIds(data);
  const differCharacters = findDifferChars(firstId, secondId);
  const commonCharacters = sliceDiffer(firstId, differCharacters);

  return {
    ids: [firstId, secondId],
    commonCharacters
  };
};
