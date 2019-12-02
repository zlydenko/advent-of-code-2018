import { Tree, Node, id } from './solution-pt1';

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

  const metaSumChildlessNodes = countChildlessNodes(nodeList);
  const metaSum: Map<id, number> = new Map(metaSumChildlessNodes);

  //? get meta from root node
  const rootNodeMeta = rootNode.getMeta();
  const nodesIdx: id[] = getChildrenIndexes(rootNodeMeta, rootNodeChildren);

  //? add each one in stack
  //? filter duplicates
  let stack = [...new Set(nodesIdx)];

  while (stack.length) {
    //? get last item from stack
    const lastItemId = stack[stack.length - 1];
    const lastItemStored = metaSum.get(lastItemId);

    if (lastItemStored) {
      stack.pop();
      continue;
    }

    const node = tree.getNode(lastItemId);

    //? check if he have children
    if (node.getChildrenCount() > 0) {
      //? get meta -> idx
      const children = node.getChildren();
      const metadata = node.getMeta();
      const childrenIds: id[] = getChildrenIndexes(metadata, children);

      //? check the idx in sum map
      const childrenWithoutValue = [...new Set(childrenIds)].filter(id => metaSum.get(id) === undefined);

      //? if there isnt - add to the stack and proceed with loop
      if (childrenWithoutValue.length) {
        childrenWithoutValue.forEach(childrenId => stack.push(childrenId));
      } else {
        //? if there is - add new sum to map
        const nodeValue = childrenIds.reduce((acc, childrenId) => {
          const childrenValue = metaSum.get(childrenId);
          if (!childrenValue) throw new Error('something went wrong');
          return acc + childrenValue;
        }, 0);

        metaSum.set(node.id, nodeValue);
        stack.pop();
      }
    }
  }

  //? go through nodesIdx and sum up node values
  const rootNodeValue = nodesIdx.reduce((acc, nodeId) => {
    const nodeValue = metaSum.get(nodeId);
    if (nodeValue === undefined) throw new Error('something went wrong');

    return acc + nodeValue;
  }, 0);
  //? return it

  return rootNodeValue;
};
