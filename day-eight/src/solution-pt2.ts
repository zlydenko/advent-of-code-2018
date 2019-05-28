import { Tree, Node, id } from './solution-pt1';
import inputLoader from '~root/inputLoader';

/* example
2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
A 2 3 [1,1,2] -> B,B,C -> 33 + 33 + 0 -> 66
  B 0 3 [10,11,12] -> no children, value is sum of metadata -> 33
  C 1 1 [2] -> idx 2 -> no child with this idx -> value is 0
    D 0 1 [99] -> no ch., value is sum of metadata -> 99
*/

export const metaSumReducer = (acc: number, n: number) => {
  return acc + n;
};

export const countChildlessNodes = (nodes: Map<id, Node>): Array<[id, number]> => {
  const childlessNodes: Array<[id, Node]> = Array.from(nodes).filter((val: [id, Node]) => {
    const [_, node] = val;
    return node.getChildrenCount() === 0;
  });
  const nodesWithSum: Array<[id, number]> = childlessNodes.map((val: [id, Node]) => {
    const [id, node] = val;
    const meta: number[] = node.getMeta();
    const metaSum: number = meta.reduce(metaSumReducer, 0);
    const result: [id, number] = [id, metaSum];
    return result;
  });
  return nodesWithSum;
};

export const getChildrenIndexes = (meta: number[], children: id[]): id[] => {
  const filtered = meta.filter(idx => idx > 0 && children[idx - 1] !== undefined);

  return filtered.map(idx => children[idx - 1]);
};

export const getRootNodeValue = (tree: Tree): number => {
  const rootNodeId = tree.rootNode;
  if (!rootNodeId) throw new Error('there is no root node');
  const nodeList = tree.nodeList();
  const rootNode = tree.getNode(rootNodeId);
  const rootNodeChildren = rootNode.getChildren();

  console.log('----------------------');
  console.log('get root element info');
  console.log('root', rootNode);
  console.log('children', rootNodeChildren);
  console.log('----------------------');

  const metaSumChildlessNodes = countChildlessNodes(nodeList);
  const metaSum: Map<id, number> = new Map(metaSumChildlessNodes);

  console.log('----------------------');
  console.log('sum of meta childless nodes', metaSumChildlessNodes);
  console.log('in map', metaSum);
  console.log('----------------------');

  //? get meta from root node
  const rootNodeMeta = rootNode.getMeta();
  const nodesIdx: id[] = getChildrenIndexes(rootNodeMeta, rootNodeChildren);

  console.log('----------------------');
  console.log('root meta', rootNodeMeta);
  console.log('children idx', nodesIdx);
  console.log('----------------------');

  //? add each one in stack
  //? filter duplicates
  let stack = [...new Set(nodesIdx)];

  console.log('----------------------');
  console.log('initial stack', stack);
  console.log('----------------------');

  while (stack.length) {
    console.log('----------------------');
    console.log('start iteration');
    console.log('----------------------');

    //? get last item from stack
    const lastItemId = stack[stack.length - 1];
    const lastItemStored = metaSum.get(lastItemId);

    console.log('looking for item in map', lastItemStored);

    if (lastItemStored) {
      const deleted = stack.pop();

      console.log('----------------------');
      console.log('remove from stack', deleted);
      console.log('----------------------');

      continue;
    }

    const node = tree.getNode(lastItemId);

    console.log('----------------------');
    console.log('last item in stack id', lastItemId);
    console.log('node', node);
    console.log('----------------------');

    //? check if he have children
    if (node.getChildrenCount() > 0) {
      console.log('----------------------');
      console.log('node have children');
      console.log('----------------------');

      //? get meta -> idx
      const children = node.getChildren();
      const metadata = node.getMeta();
      const childrenIds: id[] = getChildrenIndexes(metadata, children);

      console.log('----------------------');
      console.log('children of node', children);
      console.log('meta', metadata);
      console.log('get children indexes', childrenIds);
      console.log('----------------------');

      //? check the idx in sum map
      const childrenWithoutValue = [...new Set(childrenIds)].filter(id => metaSum.get(id) === undefined);

      console.log('----------------------');
      console.log('children without counted value', childrenWithoutValue);
      console.log('----------------------');

      //? if there isnt - add to the stack and proceed with loop
      if (childrenWithoutValue.length) {
        childrenWithoutValue.forEach(childrenId => stack.push(childrenId));

        console.log('----------------------');
        console.log('adding to stack', stack);
        console.log('----------------------');
      } else {
        //? if there is - add new sum to map
        const nodeValue = childrenIds.reduce((acc, childrenId) => {
          const childrenValue = metaSum.get(childrenId);
          if (!childrenValue) throw new Error('something went wrong');
          return acc + childrenValue;
        }, 0);

        console.log('----------------------');
        console.log('counting value', nodeValue);
        console.log('----------------------');

        metaSum.set(node.id, nodeValue);
        const deleted = stack.pop();

        console.log('----------------------');
        console.log('remove from stack', deleted);
        console.log('----------------------');
      }
    }
  }

  console.log('----------------------');
  console.log('loop over');
  console.log('----------------------');

  console.log('sum map', metaSum);

  nodesIdx.forEach(nodeId => {
    console.log('children id', nodeId);
    console.log('get sum from map', metaSum.get(nodeId));
  });

  //? go through nodesIdx and sum up node values
  const rootNodeValue = nodesIdx.reduce((acc, nodeId) => {
    const nodeValue = metaSum.get(nodeId);
    if (nodeValue === undefined) throw new Error('something went wrong');

    return acc + nodeValue;
  }, 0);
  //? return it

  return rootNodeValue;
};

const main = async () => {
  try {
    const data: number[] = await inputLoader('day-eight', (data: string) => {
      return data.split(' ').map(v => +v);
    });
    const tree = new Tree(data);
    const value = getRootNodeValue(tree);
    console.log(value);
  } catch (error) {
    throw new Error(error);
  }
};

// const testData = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
// const tree = new Tree(testData);
// const rootNodeValue = getRootNodeValue(tree);

// console.log(rootNodeValue);

main();
