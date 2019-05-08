import { BIT } from './types';

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

export const upsertBIT = (value: string, store: Map<string, BIT>): void => {
  const alreadyCreatedTree = store.get(value);

  if (alreadyCreatedTree === undefined) {
    const node = new BIT(value);
    store.set(value, node);
  }
};

export const findStartNode = (data: Map<string, BIT>): BIT => {
  const result = Array.from(data).reduce((acc: BIT | null, [_, tree]) => {
    if (acc === null) {
      return tree;
    } else {
      return tree.isStartNode() ? tree : acc;
    }
  }, null);

  if (result === null) {
    throw new Error('something went wrong');
  } else {
    return result;
  }
};

export const buildBIT = (data: Map<string, string[]>): Map<string, BIT> => {
  const trees: Map<string, BIT> = new Map();

  Array.from(data).forEach(([main, related]) => {
    [main, ...related].forEach(node => upsertBIT(node, trees));

    const mainNode = trees.get(main);

    if (mainNode !== undefined) {
      related.forEach(node => {
        const relatedNode = trees.get(node);
        if (relatedNode !== undefined) {
          mainNode.addInstructions(relatedNode);
        } else {
          throw new Error(`Error with upserting ${node} into map of BIT`);
        }
      });
    } else {
      throw new Error(`Error with upserting ${main} into map of BIT`);
    }
  });

  return trees;
};
