import {sortInputByDate, parseInputByShifts} from '../solution-pt1'
import {findCommonMinutes, mostFrequentSleep, getResult} from '../solution-pt2'

import inputLoader from '../inputLoader';

describe('day 4, part two', () => {
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

    test('it must find common elements and how many times they were filtered', () => {
        const testData = [
            [1,2,3],
            [2,3,7],
            [2,5,8],
            [2,9]
        ];
        const output = findCommonMinutes(testData);
        const expected = [2,4];

        expect(output).toEqual(expect.arrayContaining(expected))
    })

    test('it must reduce all shifts by guard and slept minutes', () => {
        const expected = new Map([
            [10,[
                [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
                    31,
                    32,
                    33,
                    34,
                    35,
                    36,
                    37,
                    38,
                    39,
                    40,
                    41,
                    42,
                    43,
                    44,
                    45,
                    46,
                    47,
                    48,
                    49,
                    50,
                    51,
                    52,
                    53,
                    54],
                    [24, 25, 26, 27, 28]
            ]],
            [99, [
                [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
                [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
                [45, 46, 47, 48, 49, 50, 51, 52, 53, 54]
            ]]
        ]);
        const parsedShifts = parseInputByShifts(testData);
        const output = mostFrequentSleep(parsedShifts);
        
        expect(output).toEqual(expected)
    })

    test('it must find which guard is most freq. asleep on the same minute', () => {
        const parsedShifts = parseInputByShifts(testData);
        const reducedShiftsByMinSlept = mostFrequentSleep(parsedShifts);
        const output = getResult(reducedShiftsByMinSlept);
        const expected = 4455;

        expect(output).toBe(expected);
    })

    test('it must produce valid result for part 2', async () => {
        const data = await inputLoader();
        const sortedInputData = sortInputByDate(data);
        const parsedShifts = parseInputByShifts(sortedInputData);
        const reducedShiftsByMinSlept = mostFrequentSleep(parsedShifts);
        const output = getResult(reducedShiftsByMinSlept);

        console.log(output)

        expect(output).not.toBeNull();
        expect(output).not.toBeUndefined();
        expect(output).not.toBe(0);
    })
})