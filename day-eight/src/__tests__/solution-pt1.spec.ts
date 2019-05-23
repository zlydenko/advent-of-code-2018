import { buildTree } from '../solution-pt1';
import inputLoader from '~root/inputLoader';

describe('day 8, part one', () => {
  const testData = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
  const testData2 = [1, 3, 0, 1, 55, 11, 15, 16];
  const testData3 = [2, 3, 2, 1, 0, 1, 5, 0, 1, 6, 7, 0, 1, 8, 9, 10, 11];

  // test('check meta sum', () => {
  //   const tree = buildTree(testData3);
  //   const output = tree.getMetaSum();

  //   expect(output).toBe(56);
  // });

  // test('check meta sum', () => {
  //   const tree = buildTree(testData2);
  //   const output = tree.getMetaSum();

  //   expect(output).toBe(97);
  // });

  // test('check meta sum', () => {
  //   const tree = buildTree(testData);
  //   const output = tree.getMetaSum();

  //   expect(output).toBe(138);
  // });

  test('get meta sum on real data', async () => {
    const data = await inputLoader('day-eight', (data: string) => data.split(' ').map(v => +v));
    const tree = buildTree(data);
    console.log(tree);

    // console.log(tree.getMetaSum());
    // console.log(data);
  });
});
