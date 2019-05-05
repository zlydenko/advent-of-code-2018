import inputLoader from "../inputLoader";
import {
  getMaxCoordValue,
  getMinCoordValue,
  findNeighbours,
  areaCreator
  // checkIfAreaIsInfinite
  // getManhattanDistance
} from "../solution-pt1";

describe("day six", () => {
  let data: string[][] = [];
  let testData = [["1", "1"], ["1", "6"], ["8", "3"], ["3", "4"], ["5", "5"], ["8", "9"]];

  beforeAll(async () => {
    data = await inputLoader();
  });

  test("it must load data", () => {
    expect(data).toHaveLength(50);
  });

  test("it must get border size", () => {
    const output = getMaxCoordValue(testData);
    const output2 = getMinCoordValue(testData);
    const expected = 9;
    const expected2 = 1;

    expect(output).toBe(expected);
    expect(output2).toBe(expected2);
  });

  test("it must get a neighbours", () => {
    const output = findNeighbours(
      {
        x: 1,
        y: 1
      },
      { x: 0, y: 0 },
      {
        x: 9,
        y: 9
      }
    );
    const expected = [
      {
        x: 0,
        y: 1
      },
      {
        x: 2,
        y: 1
      },
      {
        x: 1,
        y: 0
      },
      {
        x: 1,
        y: 2
      }
    ];

    expect(output).toEqual(expect.arrayContaining(expected));
  });

  test("it must generate areas", () => {
    const startPoint = {
      x: 0,
      y: 0
    };
    const endPoint = {
      x: 2,
      y: 2
    };
    const originPoint = {
      x: 1,
      y: 1
    };
    const areaIterator = areaCreator(startPoint, endPoint, originPoint);

    console.log(areaIterator);

    expect(false).toBe(true);
  });

  // test("it must generate Manhattan distance for location", () => {
  //   const output = getManhattanDistance(testData[0]);

  //   const expectedAreaDist1 = [[0, 1], [2, 1], [1, 0], [1, 2]];
  //   const expectedAreaDist4 = [[0, 4]];
});
