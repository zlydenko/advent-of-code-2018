import { Tree } from '../solution-pt1';

describe('day 8, part one', () => {
  const testData = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];

  test('tree initializer', () => {
    const tree = new Tree(testData);
    console.log(tree);
  });
});
