import inputLoader from '~root/inputLoader';
import { getBorderPoint, createMatrix, convertPoints, calculateManhattanDistance, getClosestPointIdx, calculatePointsAreas, getLargestFiniteAreaSize } from '../solution-pt1';

describe('day six', () => {
  let data: string[][] = [];
  const testData = [['1', '1'], ['1', '6'], ['8', '3'], ['3', '4'], ['5', '5'], ['8', '9']];

  beforeAll(async () => {
    data = await inputLoader('day-six', (data: string) => data.split('\n').map(val => val.split(', ')));
  });

  test('it must load data', () => {
    expect(data).toHaveLength(50);
  });

  test('it must get border point of matrix', () => {
    const output = getBorderPoint(testData);
    const expected = { x: 9, y: 9 };

    expect(output).toEqual(expect.objectContaining(expected));
  });

  test('it must build matrix', () => {
    const borderPoint = getBorderPoint(testData);
    const output = createMatrix(borderPoint);

    expect(output).toHaveLength(10);
    expect(output[0]).toHaveLength(10);
  });

  test('it must convert points', () => {
    const output = convertPoints(testData);
    const expected = {
      x: 1,
      y: 1
    };

    expect(output[0]).toEqual(expect.objectContaining(expected));
  });

  test('it must calculate Manhattan distance', () => {
    const originPoint = {
      x: 1,
      y: 1
    };
    const point = {
      x: 0,
      y: 0
    };
    const output = calculateManhattanDistance(point, originPoint);
    const expected = 2;

    expect(output).toBe(expected);
  });

  test('it must get closest point idx', () => {
    const points = convertPoints(testData);
    const output = getClosestPointIdx(0, 0, points);

    expect(output).toBe(0);
  });

  test('it must calculate points areas', () => {
    const borderPoint = getBorderPoint(testData);
    const matrix = createMatrix(borderPoint);
    const pointsCoords = convertPoints(testData);
    const output = calculatePointsAreas(matrix, pointsCoords);

    const expected = {
      size: 17,
      infinite: false
    };

    expect(output[4].info()).toEqual(expect.objectContaining(expected));
  });

  test('it must get size of largest finite area', () => {
    const borderPoint = getBorderPoint(data);
    const matrix = createMatrix(borderPoint);
    const pointsCoords = convertPoints(data);
    const areas = calculatePointsAreas(matrix, pointsCoords);
    const output = getLargestFiniteAreaSize(areas);

    console.log(output);

    expect(output).toBeTruthy();
  });
});
