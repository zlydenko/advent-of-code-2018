import inputLoader from '~root/inputLoader';

import { findDifferCount, findCorrectBoxIds, getCommonLetters } from '../solution-pt2';

describe('inventory management system pt.2 testcases', () => {
  const testData = ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'];

  test('it must output how many characters is not equal (examples)', () => {
    expect(findDifferCount(testData[0], testData[1])).toBe(5);
    expect(findDifferCount(testData[0], testData[5])).toBe(2);
    expect(findDifferCount(testData[1], testData[4])).toBe(1);
  });

  test('it must output how many characters is not equal (real data)', async () => {
    const realData = await inputLoader('day-two', (data: string) => data.split('\r\n'));
    expect(findDifferCount(realData[0], realData[1])).toBe(6);
    expect(findDifferCount(realData[1], realData[2])).toBe(6);
  });

  test('it must find correct box ids (examples)', () => {
    const output = ['fguij', 'fghij'];
    expect(findCorrectBoxIds(testData)).toEqual(expect.arrayContaining(output));
  });

  test('it must provide valid solution', async () => {
    const realData = await inputLoader('day-two', (data: string) => data.split('\r\n'));
    const correctBoxIds = findCorrectBoxIds(realData);
    console.log(correctBoxIds);
    const commonCharacters = getCommonLetters(correctBoxIds);
    console.log(commonCharacters);

    expect(correctBoxIds).toHaveLength(2);
  });
});
