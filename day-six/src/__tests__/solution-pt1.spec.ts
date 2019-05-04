import inputLoader from "../inputLoader";
import { getMaxCoordValue } from "../solution-pt1";

describe("day six", () => {
  let data: string[][] = [];

  beforeAll(async () => {
    data = await inputLoader();
  });

  test("it must load data", () => {
    expect(data).toHaveLength(50);
  });

  test("it must get border size", () => {
    const output = getMaxCoordValue(data);
    const expected = 359;

    expect(output).toBe(expected);
  });
});
