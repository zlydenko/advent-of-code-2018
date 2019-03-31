import { differedLetters, findCorrectBoxesId, commonLetters } from "../solution-pt2";

describe("inventory management system pt.2 testcases", () => {
  const testData = ["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"];

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
