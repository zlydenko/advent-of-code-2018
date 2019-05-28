import { Tree } from '../solution-pt1';
import { getRootNodeValue, countChildlessNodes, getChildrenIndexes } from '../solution-pt2';
import inputLoader from '~root/inputLoader';

describe('day 8, part 2', () => {
  test('get childless nodes & count meta sum', () => {
    const data = [2, 2, 0, 1, 5, 1, 1, 0, 2, 5, 5, 6, 7, 7];
    const tree = new Tree(data);
    const nodes = tree.nodeList();
    const output = countChildlessNodes(nodes);

    expect(output.length).toBe(2);
    expect(output[0][1]).toBe(5);
    expect(output[1][1]).toBe(10);
  });

  test('get children indexes', () => {
    const meta = [0, 0, 1, 1, 2];
    const children = ['test'];
    const output = getChildrenIndexes(meta, children);

    expect(output.length).toBe(2);
    expect(output[0]).toBe('test');
    expect(output[1]).toBe('test');
  });

  test('get root node value', () => {
    const testData = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
    const tree = new Tree(testData);
    const rootNodeValue = getRootNodeValue(tree);

    expect(rootNodeValue).toBe(66);
  });

  test('solution', async () => {
    const data = await inputLoader('day-eight', (data: string) => {
      return data.split(' ').map(v => +v);
    });
    const tree = new Tree(data);
    const value = getRootNodeValue(tree);

    expect(value).toBeDefined();
  });
});
