import { findSolution, findDifferChars, sliceDiffer, findCorrectBoxIds } from "../solution-pt2";
import inputData from "../inputLoader";

describe("inventory management system pt.2 testcases", () => {
  const testData = ["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"];

  test("it must find differ characters", () => {
    const first = testData[0];
    const second = testData[5];
    const differ = findDifferChars(first, second);
    const output = ["x", "y", "b", "d"];

    expect(differ).toEqual(expect.arrayContaining(output));
  });

  test("it must slice differ chars", () => {
    const chars = ["x", "y", "b", "d"];
    const firstInput = testData[0];
    const secondInput = testData[5];

    const firstOutput = "ace";
    const secondOutput = "ace";

    expect(sliceDiffer(firstInput, chars)).toBe(firstOutput);
    expect(sliceDiffer(secondInput, chars)).toBe(secondOutput);
  });

  test("find correct box ids", () => {
    const input = testData;
    const output = ["fguij", "fghij"];
    const result = findCorrectBoxIds(input);

    expect(result).toEqual(expect.arrayContaining(output));
  });

  test("it must provide valid solution", async () => {
    const data = await inputData();
    const solution = findSolution(data);

    console.log(solution.ids);
    console.log(solution.commonCharacters);

    expect(solution).toHaveProperty("ids");
    expect(solution).toHaveProperty("commonCharacters");
    expect(solution.ids).toHaveLength(2);
  });
});
