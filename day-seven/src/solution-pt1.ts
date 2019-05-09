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

//? if something looking weird is because typescript type checker sometimes real bitch
export const findBorderNodes = (data: Map<string, BIT>): { start: BIT; end: BIT } => {
  const result = Array.from(data).reduce(
    (acc: { start: BIT | null; end: BIT | null }, [_, tree]) => {
      if (tree.isStartNode()) acc.start = tree;
      if (tree.isLastNode()) acc.end = tree;

      return acc;
    },
    { start: null, end: null }
  );

  if (result.start && result.end) {
    return {
      start: result.start,
      end: result.end
    };
  } else {
    throw new Error('something went wrong');
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

export const BITStr = (borderNodes: { start: BIT; end: BIT }): void => {
  let node = borderNodes.start;
  while (true) {
    if (node.isLastNode()) {
      console.log(node.getValue());
      console.log('EOF');
      break;
    }

    const leftNodes = node.left;
    const rightNode = node.right;

    leftNodes.forEach();

    // console.log(node.getValue())
    // node =
  }
};
