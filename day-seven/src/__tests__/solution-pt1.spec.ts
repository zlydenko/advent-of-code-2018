import inputLoader from '../inputLoader';
import { parseInput, Instructions } from '../solution-pt1';

describe('day 7: part one', () => {
  const testData = [
    'Step F must be finished before step E can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step C must be finished before step A can begin.',
    'Step C must be finished before step F can begin.'
  ];
  let data: string[] = [];

  test('load input data', async () => {
    try {
      data = await inputLoader();

      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(101);
    } catch (error) {
      throw error;
    }
  });

  test('parse the input', () => {
    const output = parseInput(testData);

    expect(output[0][0]).toBe('F');
    expect(output[0][1]).toBe('E');
    expect(output[6][0]).toBe('C');
    expect(output[6][1]).toBe('F');
    expect(output).toHaveLength(7);
  });

  test('create steps instructions', () => {
    const parsedInput = parseInput(testData);
    const output = new Instructions(parsedInput);
    const stepE = output.getStep('E');

    expect(stepE).not.toBeNull();

    if (stepE) {
      expect(stepE.dependencies).toHaveLength(3);
      expect(stepE.dependencies).toEqual(expect.arrayContaining(['B', 'D', 'F']));
    }
  });

  test('show instructions in string', () => {
    const parsedInput = parseInput(testData);
    const output = new Instructions(parsedInput);

    expect(output.toString()).toBe('CABDFE');
  });

  test('test instructions to string with more than one starting point', () => {
    const data = [['A', 'B'], ['C', 'B'], ['C', 'F'], ['B', 'D'], ['B', 'E'], ['F', 'O'], ['D', 'O'], ['E', 'O']];
    const instructions = new Instructions(data);
    const output = instructions.toString();
    const expected = 'ACBDEFO';

    expect(output).toBe(expected);
  });

  test('output result for part one', () => {
    const parsedData = parseInput(data);
    const instructions = new Instructions(parsedData);
    const output = instructions.toString();

    console.log(output);
  });
});
