import { findIntactSlice } from "../solution-pt2";
import { parseFabricSlice } from "../solution-pt1";
import importData from "../inputLoader";

describe("No Matter How You Slice It pt.2 testcases", () => {
  const testData = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];

  test("it must provide valid intact slice (test data)", () => {
    const sliceData = testData.map(str => parseFabricSlice(str));
    const output = "3";
    expect(findIntactSlice(sliceData)).toBe(output);
  });
});
