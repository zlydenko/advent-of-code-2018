import inputLoader from '../inputLoader';
import {
  getBorderPoint
  //something
} from '../solution-pt1';

describe('day six', () => {
  let data: string[][] = [];
  let testData = [['1', '1'], ['1', '6'], ['8', '3'], ['3', '4'], ['5', '5'], ['8', '9']];

  beforeAll(async () => {
    data = await inputLoader();
  });

  test('it must load data', () => {
    expect(data).toHaveLength(50);
  });

  test('it must get border point of matrix', () => {
    const output = getBorderPoint(testData);
    const expected = { x: 9, y: 9 };

    expect(output).toEqual(expect.objectContaining(expected));
  });
});
