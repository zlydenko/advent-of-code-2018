import { Tree } from '../solution-pt1';
import inputLoader from '~root/inputLoader';

describe('day 8, part one', () => {
  const testData = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
  const testData2 = [1, 3, 0, 1, 55, 11, 15, 16];
  const testData3 = [2, 3, 2, 1, 0, 1, 5, 0, 1, 6, 7, 0, 1, 8, 9, 10, 11];

  test('tree', () => {
    // const treeWithChildren = new Tree([1, 1, 0, 1, 66, 55]);
    // const treeWithoutChildren = new Tree([0, 3, 55, 66, 22]);
    const tree = new Tree(testData2);

    console.log(tree);
    // console.log(treeWithoutChildren);
  });
});
