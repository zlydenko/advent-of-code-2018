import { coords, SafeRegion } from '../types';
import { convertPoints } from '../solution-pt1';
import { calculateSumManhattanDistances, isPointInRegion } from '../solution-pt2';

describe('day 6: part two', () => {
  const testData = convertPoints([['1', '1'], ['1', '6'], ['8', '3'], ['3', '4'], ['5', '5'], ['8', '9']]);
  const testPoint = {
    x: 4,
    y: 3
  };

  test('calculate sum of manhattan distances', () => {
    const output = calculateSumManhattanDistances(testPoint, testData);

    expect(output).toBe(30);
  });

  test("validate point is in region's max distance", () => {
    const testRegion = new SafeRegion();
    testRegion._changeDistance(32);
    const sum = calculateSumManhattanDistances(testPoint, testData);

    const output = isPointInRegion(sum, testRegion);

    expect(output).toBe(true);
  });
});
