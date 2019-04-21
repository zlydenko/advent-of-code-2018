import {
  ShiftState,
  calculateResult,
  findCommonElements,
  getState,
  sortInputByDate,
  extractDate,
  parseDate,
  parseInputByShifts
} from "../solution-pt1";

import inputLoader from "../inputLoader";

describe("day 4. part 1", () => {
  const testData = [
    "[1518-11-01 00:00] Guard #10 begins shift",
    "[1518-11-01 00:05] falls asleep",
    "[1518-11-01 00:25] wakes up",
    "[1518-11-01 00:30] falls asleep",
    "[1518-11-01 00:55] wakes up",
    "[1518-11-01 23:58] Guard #99 begins shift",
    "[1518-11-02 00:40] falls asleep",
    "[1518-11-02 00:50] wakes up",
    "[1518-11-03 00:05] Guard #10 begins shift",
    "[1518-11-03 00:24] falls asleep",
    "[1518-11-03 00:29] wakes up",
    "[1518-11-04 00:02] Guard #99 begins shift",
    "[1518-11-04 00:36] falls asleep",
    "[1518-11-04 00:46] wakes up",
    "[1518-11-05 00:03] Guard #99 begins shift",
    "[1518-11-05 00:45] falls asleep",
    "[1518-11-05 00:55] wakes up"
  ];

  test("it must extract date from input", () => {
    const testData = "[1518-11-01 00:00] Guard #10 begins shift";
    const output = extractDate(testData);
    const expected = "1518-11-01 00:00";

    expect(output).toBe(expected);
  });

  test("it must create valid date obj", () => {
    const testData = "1518-11-01 00:00";
    const output = parseDate(testData);
    const expected = new Date(1518, 10, 1, 0, 0);

    expect(output).toEqual(expected);
  });

  test("it must sort array by date", () => {
    const testData = [
      "[1518-11-04 00:05] falls asleep",
      "[1518-11-11 00:46] wakes up",
      "[1518-11-03 00:24] falls asleep",
      "[1518-11-03 00:21] falls asleep"
    ];
    const output = sortInputByDate(testData);
    const expectedFirstElem = "[1518-11-03 00:21] falls asleep";

    expect(output[0]).toBe(expectedFirstElem);
  });

  test("it must get valid shift state", () => {
    const output1 = getState(testData[0]);
    const output2 = getState(testData[1]);
    const output3 = getState(testData[2]);

    expect(output1).toBe(ShiftState.STARTED);
    expect(output2).toBe(ShiftState.SLEEP);
    expect(output3).toBe(ShiftState.WAKE);
  });

  test("it must parse input and slice it by shifts", () => {
    const output = parseInputByShifts(testData);
    const expectedOutput = {
      guardId: 99,
      sleep: 10,
      sleepMinAM: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
      status: ShiftState.FINISHED
    };

    expect(output[1]).toEqual(expect.objectContaining(expectedOutput));
  });

  test("it must find common elements", () => {
    const testData = [[1, 2, 3], [2, 3, 7], [2, 8, 5]];
    const output = findCommonElements(testData);
    const expected = [2];

    expect(output).toEqual(expect.arrayContaining(expected));
  });

  test("it must find guard who spend the most minutes asleep & minutes he most slept", () => {
    const parsedShifts = parseInputByShifts(testData);
    const output = calculateResult(parsedShifts);
    const expected = 240;

    expect(output).toBe(expected);
  });

  test("it must calculate answer", async () => {
    const data = await inputLoader();
    const sortedByDate = sortInputByDate(data);
    const parsedShifts = parseInputByShifts(sortedByDate);
    const output = calculateResult(parsedShifts) || 0;

    console.log(output);

    expect(output).not.toBe(0);
  });
});
