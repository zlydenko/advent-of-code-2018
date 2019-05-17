import { getAllPossiblePolymers, getShortestPolymer } from '../solution-pt2';

import inputLoader from '~root/inputLoader';

describe('day 5, part 2', () => {
  test('it must show all possible polymers', () => {
    const test = 'dabAcCaCBAcCcaDA';
    const expected = ['dbcCCBcCcD', 'daAcCaCAcCcaDA', 'dabAaBAaDA', 'abAcCaCBAcCcaA'];
    const output = getAllPossiblePolymers(test);

    expect(output).toEqual(expect.arrayContaining(expected));
  });

  test('it must get size of shortest polymer we can produce', () => {
    const test = 'dabAcCaCBAcCcaDA';
    const output = getShortestPolymer(test);
    const expected = ['daDA', 4];

    expect(output).toEqual(expect.arrayContaining(expected));
  });

  test('it must produce valid result for part 2', async () => {
    const data = await inputLoader('day-five');
    const shortestPolymer = getShortestPolymer(data);
    const output = shortestPolymer[1] || null;

    console.log(output);

    expect(output).not.toBeNull();
    expect(output).not.toBe(0);
  });
});
