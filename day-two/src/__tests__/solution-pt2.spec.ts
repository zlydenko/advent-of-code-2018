import { findLikelyPairsId, differedLetters, findCorrectBoxesId, commonLetters } from "../solution-pt2";

describe("inventory management system pt.2 testcases", () => {
  const testData = ["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"];

  test("must find likely pair with 2 differ characters", () => {
    const entryData = findLikelyPairsId(testData[0], 0, [testData[0], testData[4], testData[5]]);
    const expectedResult = [[testData[0], testData[5], 2]];
    expect(entryData).toEqual(expectedResult);
  });

  test("must find likely pair with 1 differ character", () => {
    const entryData = findLikelyPairsId(testData[1], 0, [testData[1], testData[2], testData[3], testData[4]]);
    const expectedResult = [[testData[1], testData[4], 1]];
    expect(entryData).toEqual(expectedResult);
  });

  test("all letters isnt match", () => {
    expect(differedLetters(testData[0], testData[1])).toBe(5);
  });

  test("differ by two characters", () => {
    expect(differedLetters(testData[0], testData[5])).toBe(2);
  });

  test("differ by one character", () => {
    expect(differedLetters(testData[1], testData[4])).toBe(1);
  });

  test("find two correct box ids", () => {
    expect(findCorrectBoxesId(testData)).toEqual(["fghij", "fguij"]);
  });

  test("find common letters between 2 correct box ids", () => {
    const correctBoxIds = findCorrectBoxesId(testData);
    expect(commonLetters(correctBoxIds)).toBe("fgij");
  });
});
