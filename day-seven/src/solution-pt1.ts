//? again this TYPES can't get string[][]
export const parseInput = (input: string[]): string[] => {
  const regPattern = new RegExp(/(?<!^)[A-Z]/g);
  return input.map(str => {
    const keys = str.match(regPattern);
    return keys === null ? '' : keys.join('');
  });
};

export const generateRelationsMap = (data: string[]): Map<string, string[]> => {
  return data.reduce((relations: Map<string, string[]>, relation: string) => {
    const [main, related] = relation.split('');
    const foundRelation = relations.get(main);

    if (foundRelation !== undefined) {
      relations.set(main, [...foundRelation, related]);
    } else {
      relations.set(main, [related]);
    }

    return relations;
  }, new Map());
};
