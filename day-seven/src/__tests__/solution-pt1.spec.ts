import inputLoader from '../inputLoader';
import { parseInput, sortInput } from '../solution-pt1';

import { Node, Instructions } from '../types';

describe('day 7: part one', () => {
  const testData = [
    'Step C must be finished before step A can begin.',
    'Step C must be finished before step F can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step F must be finished before step E can begin.'
  ];
  let data = [];

  test('load input data', async () => {
    try {
      data = await inputLoader();

      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(101);
    } catch (error) {
      throw error;
    }
  });

  test('parse input data', () => {
    const output = parseInput(testData);
    const expected = ['CA', 'CF', 'AB'];

    expect(output).toEqual(expect.arrayContaining(expected));
  });

  test('sorting parsed data', () => {
    const parsedData = parseInput(testData);
    const output = sortInput(parsedData);
    const expected = ['AB', 'AD', 'BE', 'CA', 'CF', 'DE', 'FE'];

    expect(output[0]).toBe(expected[0]);
    expect(output[2]).toBe(expected[2]);
    expect(output[6]).toBe(expected[6]);
  });
});
