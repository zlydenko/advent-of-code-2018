import { parseInput } from '../solution-pt1';
import { Schedule } from '../solution-pt2';
import inputLoader from '~root/inputLoader';

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

    console.time('Creating schedule instance');
    const schedule = new Schedule(parsedInput, 2);
    console.timeEnd('Creating schedule instance');

    const expectedTime = 15;
    const expectedResult = 'CABFDE';

    console.time('Calculating completing time');
    const { timeSpent, result } = schedule.calculateCompletingTime();
    console.timeEnd('Calculating completing time');

    expect(timeSpent).toBe(expectedTime);
    expect(result).toBe(expectedResult);
  });

  test('create schedule on real data', async () => {
    const data = await inputLoader('day-seven', (data: string) => data.split('\n'));
    const parsedData = parseInput(data);

    console.time('Creating schedule instance');
    const schedule = new Schedule(parsedData, 5, 60);
    console.timeEnd('Creating schedule instance');

    const expected = 906;

    console.time('Calculating completing time');
    const output = schedule.calculateCompletingTime();
    console.timeEnd('Calculating completing time');

    console.log(output);

    expect(output.timeSpent).toBe(expected);
  });
});
