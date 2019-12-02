import inputLoader from '~root/inputLoader';
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

  test('create valid region from test matrix', () => {
    const borderPoint = getBorderPoint(testDataRaw);
    const matrix = createMatrix(borderPoint);
    const testRegion = new SafeRegion();
    testRegion._changeDistance(32);

    calculateSafeRegion(matrix, testData, testRegion);

    expect(testRegion).toBeInstanceOf(SafeRegion);
    expect(testRegion.getSize()).toBe(16);
  });

  test('solution for part two', async () => {
    try {
      const data = await inputLoader('day-six', (data: string) => data.split('\n').map(val => val.split(', ')));
      const parsedData = convertPoints(data);
      const borderPoint = getBorderPoint(data);
      const matrix = createMatrix(borderPoint);
      const region = new SafeRegion();

      calculateSafeRegion(matrix, parsedData, region);

      console.log(region.getSize());

      expect(region).toBeInstanceOf(SafeRegion);
    } catch (error) {
      throw error;
    }
  });
});
