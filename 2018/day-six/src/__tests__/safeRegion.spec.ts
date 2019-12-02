import { SafeRegion } from '../types';

describe('safe region instance', () => {
  test('it must create valid safe region', () => {
    const testRegion = new SafeRegion();
    testRegion.increase();
    testRegion.increase();

    expect(testRegion.getSize()).toBe(2);
    expect(testRegion.getMaxDistance()).toBe(10000);
  });
});
