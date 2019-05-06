import inputLoader from "../inputLoader";
import {
  getBorderPoint,
  createMatrix,
  convertPoints,
  calculateManhattanDistance,
  Point
  //something
} from "../solution-pt1";
import { Area } from "../area.class";

describe("day six", () => {
  let data: string[][] = [];
  let testData = [["1", "1"], ["1", "6"], ["8", "3"], ["3", "4"], ["5", "5"], ["8", "9"]];

  beforeAll(async () => {
    data = await inputLoader();
  });

  test("it must load data", () => {
    expect(data).toHaveLength(50);
  });

  test("it must get border point of matrix", () => {
    const output = getBorderPoint(testData);
    const expected = { x: 9, y: 9 };

    expect(output).toEqual(expect.objectContaining(expected));
  });

  test("it must build matrix", () => {
    const borderPoint = getBorderPoint(testData);
    const output = createMatrix(borderPoint);

    expect(output).toHaveLength(10);
    expect(output[0]).toHaveLength(10);
  });

  test("it must convert points", () => {
    const output = convertPoints(testData);
    const expected = {
      x: 1,
      y: 1
    };

    expect(output[0]).toEqual(expect.objectContaining(expected));
  });

  test("it must calculate Manhattan distance", () => {
    const originPoint = {
      x: 1,
      y: 1
    };
    const point = {
      x: 0,
      y: 1
    };
    const output = calculateManhattanDistance(point, originPoint);
    const expected = 1;

    expect(output).toBe(expected);
  });

  test("it must create valid Point", () => {
    const coords = {
      x: 1,
      y: 1
    };
    const testPoint = new Point(coords);
    testPoint.setInfinite();
    testPoint.addArea();
    testPoint.addArea();

    expect(testPoint.isFinite()).toBe(false);
    expect(testPoint.getAreaQuantity()).toBe(2);
  });

  test("it must create valid Area", () => {
    const origin = {
      x: 1,
      y: 1
    };
    const testArea = new Area(origin);

    testArea.increase();
    testArea.increase(3);
    testArea.isInfinite();

    const expected = {
      size: 5,
      infinite: true
    };

    expect(testArea).toBeInstanceOf(Area);
    expect(testArea.info()).toEqual(expect.objectContaining(expected));
  });
});
