import { scanBoxId, boxIdChecksum } from "../solution-pt1";

describe("inventory management system testcases", () => {
  const testData = ["abcdef", "bababc", "abbcde", "abcccd", "aabcdd", "abcdee", "ababab"];

  test("1. contains no letters that appear exactly two or three times", () => {
    expect(scanBoxId(testData[0])).toBe([0, 0]);
  });

  test("2. contains two a and three b, so it counts for both", () => {
    expect(scanBoxId(testData[1])).toBe([1, 1]);
  });

  test("3. contains two b, but no letter appears exactly three times", () => {
    expect(scanBoxId(testData[2])).toBe([1, 0]);
  });

  test("4. contains three c, but no letter appears exactly two times", () => {
    expect(scanBoxId(testData[3])).toBe([0, 1]);
  });

  test("5. contains two a and two d, but it only counts once", () => {
    expect(scanBoxId(testData[4])).toBe([1, 0]);
  });

  test("6. contains two e", () => {
    expect(scanBoxId(testData[5])).toBe([1, 0]);
  });

  test("7. contains three a and three b, but it only counts once", () => {
    expect(scanBoxId(testData[6])).toBe([0, 1]);
  });

  test("final checksum: 4 * 3 = 12", () => {
    expect(boxIdChecksum(testData)).toBe(12);
  });
});
