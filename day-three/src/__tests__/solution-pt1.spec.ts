import { parseFabricSlice, findOverlapSize } from "../solution-pt1";

describe("No Matter How You Slice It pt.1 testcases", () => {
  test("it must provide valid parsed data of slice", () => {
    const input = "#123 @ 3,2: 2x2";
    const expected = {
      id: 123,
      coords: [
        {
          x: 4,
          y: 3
        },
        {
          x: 5,
          y: 3
        },
        {
          x: 4,
          y: 4
        },
        {
          x: 5,
          y: 4
        }
      ]
    };

    const result = parseFabricSlice(input);
    expect(result.id).toBe(123);
    expect(result.coords).toEqual(expect.arrayContaining(expected.coords));
  });

  test("it must provide valid overlap sizes", () => {
    const testData = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];
    const firstSlice = parseFabricSlice(testData[0]);
    const secondSlice = parseFabricSlice(testData[1]);
    const thirdSlice = parseFabricSlice(testData[2]);
    const overlapCoords = findOverlapSize([firstSlice, secondSlice, thirdSlice]);
    const expectedOutput = 4;

    expect(overlapCoords).toBe(expectedOutput);
  });
});
