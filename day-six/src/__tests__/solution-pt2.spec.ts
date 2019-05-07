import { SafeRegion } from '../types';
import { convertPoints, getBorderPoint, createMatrix } from '../solution-pt1';
import { calculateSumManhattanDistances, isPointInRegion, calculateSafeRegion } from '../solution-pt2';

describe('day 6: part two', () => {
  const testDataRaw = [['1', '1'], ['1', '6'], ['8', '3'], ['3', '4'], ['5', '5'], ['8', '9']];
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

  test('it must create valid region from test matrix', () => {
    const borderPoint = getBorderPoint(testDataRaw);
    const matrix = createMatrix(borderPoint);
    const testRegion = new SafeRegion();
    testRegion._changeDistance(32);
    const output = calculateSafeRegion(matrix, testData, testRegion);

    expect(output).toBeInstanceOf(SafeRegion);
    expect(output.getSize()).toBe(16);
  });
});
