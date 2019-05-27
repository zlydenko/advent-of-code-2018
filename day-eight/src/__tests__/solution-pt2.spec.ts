import { Tree } from "../solution-pt1";
import { getRootNodeValue } from "../solution-pt2";
import inputLoader from "~root/inputLoader";

describe("day 8, part 2", () => {
  test("get root node value", () => {
    const testData = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
    const tree = new Tree(testData);
    const rootNodeValue = getRootNodeValue(tree);

    expect(rootNodeValue).toBe(66);
  });
});
