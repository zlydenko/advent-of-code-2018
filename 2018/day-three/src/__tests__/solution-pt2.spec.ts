import { findIntactSlice, parseCoords, getOverlapsIds, main } from '../solution-pt2';
import { parseFabricSlice } from '../solution-pt1';
import inputLoader from '~root/inputLoader';

describe('No Matter How You Slice It pt.2 testcases', () => {
  const testData = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

  test('it must filter slices with overlaps', () => {
    const sliceData = testData.map(str => parseFabricSlice(str));
    const parsedSliceData = parseCoords(sliceData);
    expect(getOverlapsIds(parsedSliceData)).toEqual(expect.arrayContaining(['1', '2']));
  });

  test('it must provide valid intact slice (test data)', () => {
    const sliceData = testData.map(str => parseFabricSlice(str));
    const output = '3';
    expect(findIntactSlice(sliceData)).toBe(output);
  });

  test('it must provide valid solution', async () => {
    const data = await inputLoader('day-three', (data: string) => data.split('\r\n'));
    const result = main(data);
    console.log(result);

    expect(result).toBeTruthy();
  });
});
