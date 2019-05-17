import { parseInput } from '../solution-pt1';
import { Schedule } from '../solution-pt2';
import inputLoader from '../inputLoader';

describe('day 7, part 2', () => {
  const testData = [
    'Step F must be finished before step E can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step C must be finished before step A can begin.',
    'Step C must be finished before step F can begin.'
  ];

  test('create schedule from example', () => {
    const parsedInput = parseInput(testData);
    const schedule = new Schedule(parsedInput, 2);
    const expectedTime = 15;
    const expectedResult = 'CABFDE';

    const { timeSpent, result } = schedule.calculateCompletingTime();

    expect(timeSpent).toBe(expectedTime);
    expect(result).toBe(expectedResult);
  });

  test('create schedule on real data', async () => {
    const data = await inputLoader();
    const parsedData = parseInput(data);
    const schedule = new Schedule(parsedData, 5, 60);

    const output = schedule.calculateCompletingTime();

    console.log(output);
  });
});
