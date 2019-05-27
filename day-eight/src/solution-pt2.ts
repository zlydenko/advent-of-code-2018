import { NodeQueue, Tree, Node, id } from "./solution-pt1";

/* example
2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
A 2 3 [1,1,2] -> B,B,C -> 33 + 33 + 0 -> 66
  B 0 3 [10,11,12] -> no children, value is sum of metadata -> 33
  C 1 1 [2] -> idx 2 -> no child with this idx -> value is 0
    D 0 1 [99] -> no ch., value is sum of metadata -> 99
*/

export const countChildlessNodes = (nodes: Map<id, Node>): Array<[id, number]> => {
  return Array.from(nodes)
    .filter((val: [id, Node]) => {
      const [_, node] = val;
      return node.getChildrenCount() === 0;
    })
    .map(([id, node]: [id, Node]) => {
      const metaSum = node.getMeta().reduce((acc, n) => acc + n, 0);
      return [id, metaSum];
    });
};

export const getRootNodeValue = (tree: Tree): number => {
  const rootNodeId = tree.rootNode;
  const nodeList = tree.nodeList();

  if (!rootNodeId) throw new Error("there is no root node");

  const metaSumChildlessNodes = countChildlessNodes(nodeList);
  const metaSum: Map<id, number> = new Map(metaSumChildlessNodes);
  const rootNode = tree.getNode(rootNodeId);
  const rootNodeChildren = rootNode.getChildren();

  //? get meta from root node
  const rootNodeMeta = rootNode.getMeta();
  const nodesIdx: id[] = rootNodeMeta
    .filter(idx => idx !== 0)
    .map(idx => idx - 1)
    .filter(idx => rootNodeChildren[idx] !== undefined)
    .map(idx => rootNodeChildren[idx]);
  //? add each one in stack
  //? filter duplicates
  let stack = [...new Set(nodesIdx)];

  // let idx = 0;
  while (stack.length) {
    //? get last item from stack
    const lastItem = stack[stack.length - 1];
    const node = tree.getNode(lastItem);
    //? check if he have children
    if (node.getChildrenCount() > 0) {
      //? get meta -> idx
      const children = node.getChildren();
      const metadata = node.getMeta();
      const childrenIds: id[] = metadata
        .filter(id => id >= 1)
        .map(id => id - 1)
        .filter(id => children[id] !== undefined)
        .map(id => children[id]);
      //? check the idx in sum map
      const childrenWithoutValue = [...new Set(childrenIds)].filter(id => metaSum.get(id) === undefined);
      //? if there isnt - add to the stack and proceed with loop
      if (childrenWithoutValue.length) {
        childrenWithoutValue.forEach(childrenId => stack.push(childrenId));
      } else {
        //? if there is - add new sum to map
        const nodeValue = childrenIds.reduce((acc, childrenId) => {
          const childrenValue = metaSum.get(childrenId);
          if (!childrenValue) throw new Error("something went wrong");
          return acc + childrenValue;
        }, 0);
        metaSum.set(node.id, nodeValue);
      }
    }
  }

  //? go through nodesIdx and sum up node values
  const rootNodeValue = nodesIdx.reduce((acc, nodeId) => {
    const nodeValue = metaSum.get(nodeId);
    if (!nodeValue) throw new Error("something went wrong");

    return acc + nodeValue;
  }, 0);
  //? return it

  return rootNodeValue;
};
