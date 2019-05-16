import { parseInput } from '../solution-pt1';
import { Schedule, generateId } from '../solution-pt2';

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

  test('create default schedule', () => {
    const parsedInput = parseInput(testData);
    const schedule = new Schedule(parsedInput, 5);
    const scheduledWorks = schedule.getWorks();
    const workA = scheduledWorks.get('A');
    const expected = ['C'];

    expect(workA).not.toBeNull();

    if (workA) {
      expect(workA.dependencies).toEqual(expect.arrayContaining(expected));
      expect(workA.completingTime).toBe(61);
    }
  });

  test('appoint tasks to workers', () => {
    const parsedInput = parseInput(testData);
    const schedule = new Schedule(parsedInput, 5);
    schedule.appointTask('C', 1, 5);

    expect(() => schedule.appointTask('A', 6, 5)).toThrow();
    expect(() => schedule.appointTask('Z', 1, 5)).toThrow();
    expect(schedule.getAvailableWorkers()).toEqual(expect.arrayContaining([2, 3, 4, 5]));
  });

  test('generate id', () => {
    const id = generateId();

    console.log(id);
  });

  // test('get available works', () => {
  //   const parsedInput = parseInput(testData);
  //   const schedule = new Schedule(parsedInput, 5);
  //   schedule.appointTask('C', 1, 5);
  //   const availableWorks = schedule.getAvailableWorks();

  //   schedule.info();

  //   // expect(availableWorks).toHaveLength(0);
  // });
});
