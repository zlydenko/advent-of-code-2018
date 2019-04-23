import {findCommonMinutes} from '../solution-pt2'


describe('day 4, part two', () => {
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
})