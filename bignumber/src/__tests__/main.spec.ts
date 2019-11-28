import { getNextBigNumber } from "../main";

describe("get next big number", () => {
  test("125", () => {
    const nextBigNumber = getNextBigNumber(125);

    expect(nextBigNumber).toBe(152);
  });

  test("152", () => {
    const nextBigNumber = getNextBigNumber(152);

    expect(nextBigNumber).toBe(215);
  });

  test("215", () => {
    const nextBigNumber = getNextBigNumber(215);

    expect(nextBigNumber).toBe(251);
  });

  test("251", () => {
    const nextBigNumber = getNextBigNumber(251);

    expect(nextBigNumber).toBe(512);
  });

  test("512", () => {
    const nextBigNumber = getNextBigNumber(512);

    expect(nextBigNumber).toBe(521);
  });
});
