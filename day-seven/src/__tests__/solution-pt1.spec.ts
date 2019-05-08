import inputLoader from '../inputLoader';
import { parseInput } from '../solution-pt1';

import { BIT } from '../types';

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

  test('creates tree', () => {
    const nodeA = new BIT('A');
    const nodeC = new BIT('C');
    const nodeF = new BIT('F');
    const nodeB = new BIT('B');
    const nodeD = new BIT('D');

    nodeA.addInstructions(nodeD).addInstructions(nodeB);
    nodeC.addInstructions(nodeF).addInstructions(nodeA);

    console.log('A');
    console.log(nodeA.toString());
    console.log('C');
    console.log(nodeC.toString());

    expect(nodeC).toBeInstanceOf(BIT);
  });
});
