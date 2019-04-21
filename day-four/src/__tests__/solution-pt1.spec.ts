import { sortInputByDate, extractDate, parseDate } from "../solution-pt1";

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
});
