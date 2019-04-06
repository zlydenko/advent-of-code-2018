// import { findSolution, findDifferChars, sliceDiffer, findCorrectBoxIds } from "../solution-pt2";
import inputData from "../inputLoader";

import { findDifferCount } from "../solution-pt2";

describe("inventory management system pt.2 testcases", () => {
  const testData = ["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"];

  test("it must output how many characters is not equal (examples)", () => {
    expect(findDifferCount(testData[0], testData[1])).toBe(5);
    expect(findDifferCount(testData[0], testData[5])).toBe(2);
    expect(findDifferCount(testData[1], testData[4])).toBe(1);
  });

  test("it must output how many characters is not equal (real data)", async () => {
    const realData = await inputData();
    expect(findDifferCount(realData[0], realData[1])).toBe(6);
    expect(findDifferCount(realData[1], realData[2])).toBe(6);
  });

  // test("it must find differ characters", () => {
  //   const first = testData[0];
  //   const second = testData[5];
  //   const differ = findDifferChars(first, second);
  //   const output = ["x", "y", "b", "d"];

  //   expect(differ).toEqual(expect.arrayContaining(output));
  // });

  // test("it must slice differ chars", () => {
  //   const chars = ["x", "y", "b", "d"];
  //   const firstInput = testData[0];
  //   const secondInput = testData[5];

  //   const firstOutput = "ace";
  //   const secondOutput = "ace";

  //   expect(sliceDiffer(firstInput, chars)).toBe(firstOutput);
  //   expect(sliceDiffer(secondInput, chars)).toBe(secondOutput);
  // });

  // test("find correct box ids", () => {
  //   const input = testData;
  //   const output = ["fguij", "fghij"];
  //   const result = findCorrectBoxIds(input);

  //   expect(result).toEqual(expect.arrayContaining(output));
  // });

  // test("it must provide valid solution", async () => {
  //   const data = await inputData();
  //   const solution = findSolution(data);

  //   console.log(solution.ids);
  //   console.log(solution.commonCharacters);

  //   expect(solution).toHaveProperty("ids");
  //   expect(solution).toHaveProperty("commonCharacters");
  //   expect(solution.ids).toHaveLength(2);
  // });
});
