import {
    unitsHaveSameType,
    unitsHaveSamePolarity,
    isReact
} from '../solution-pt1'

describe('day 5, part 1', () => {
    test('it must check if units have same type', () => {
        const testData: [string,string][] = [
            ['r', 'R'],
            ['a', 'a'],
            ['b', 'X'],
            ['b', 'x']
        ]
        const expected = [
            true,
            true,
            false,
            false
        ]

        expect(unitsHaveSameType(testData[0])).toBe(expected[0]);
        expect(unitsHaveSameType(testData[1])).toBe(expected[1]);
        expect(unitsHaveSameType(testData[2])).toBe(expected[2]);
        expect(unitsHaveSameType(testData[3])).toBe(expected[3]);

    })

    test('it must check if units have same polarity', () => {
        const testData: [string,string][] = [
            ['a','A'],
            ['x','x'],
            ['R', 'r'],
            ['R', 'R']
        ]
        const expected = [
            false,
            true,
            false,
            true
        ]

        expect(unitsHaveSamePolarity(testData[0])).toBe(expected[0])
        expect(unitsHaveSamePolarity(testData[1])).toBe(expected[1])
        expect(unitsHaveSamePolarity(testData[2])).toBe(expected[2])
        expect(unitsHaveSamePolarity(testData[3])).toBe(expected[3])

    })

    test('it must check if units reacts', () => {
        const testData: [string,string][] = [
            ['a','a'],
            ['A','a'],
            ['x','b'],
            ['r','Y'],
            ['u', 'U']
        ]
        const expected = [
            false,
            true,
            false,
            false,
            true
        ]

        expect(isReact(testData[0])).toBe(expected[0])
        expect(isReact(testData[1])).toBe(expected[1])
        expect(isReact(testData[2])).toBe(expected[2])
        expect(isReact(testData[3])).toBe(expected[3])
        expect(isReact(testData[4])).toBe(expected[4])
    })
})