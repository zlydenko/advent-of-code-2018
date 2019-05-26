import { Node, Tree } from "../solution-pt1";
import inputLoader from "~root/inputLoader";

describe("day 8, part one", () => {
  const testData = [
    [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2],
    [1, 3, 0, 1, 55, 11, 15, 16],
    [2, 3, 2, 1, 0, 1, 5, 0, 1, 6, 7, 0, 1, 8, 9, 10, 11]
  ];

  test("build simple node", () => {
    const header: [number, number] = [1, 3];
    const node = new Node(header);

    expect(node).toBeInstanceOf(Node);
    expect(node.getChildrenCount()).toBe(header[0]);
    expect(node.getMetadataLength()).toBe(header[1]);
  });

  test("check node is fulfilled", () => {
    const header: [number, number] = [1, 2];
    const childHeader: [number, number] = [0, 3];
    const nodeMeta = [1, 2];
    const childMeta = [1, 2, 3];
    const node = new Node(header);
    const childNode = new Node(childHeader);
    const emptyNode = new Node([0, 0]);

    expect(node.isFulfilled).toBe(false);
    expect(childNode.isFulfilled).toBe(false);
    childNode.setMeta(childMeta);
    expect(childNode.isFulfilled).toBe(true);
    node.setMeta(nodeMeta);
    expect(node.isFulfilled).toBe(false);
    node.addChild(childNode.id);
    expect(node.isFulfilled).toBe(true);
    expect(emptyNode.isFulfilled).toBe(true);
  });

  test("build the tree", () => {
    const treeNodes: Array<Map<string, Node>> = testData
      .reduce((treeAcc: Tree[], input: number[]) => {
        return [...treeAcc, new Tree(input)];
      }, [])
      .map(tree => tree.nodeList());

    expect(treeNodes[0].size).toBe(4);
    expect(treeNodes[1].size).toBe(2);
    expect(treeNodes[2].size).toBe(5);
  });
});
