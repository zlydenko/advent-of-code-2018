import { findDuplicateFrequency } from '../index';

describe('find duplicate frequency', () => {
  test('reaches 0 twice', () => {
    const testData = ['+1', '-1'];
    expect(findDuplicateFrequency(testData, 0)).toBe(0);
  });

  test('reaches 10 twice', () => {
    const testData = ['+3', '+3', '+4', '-2', '-4'];
    expect(findDuplicateFrequency(testData, 0)).toBe(10);
  });

  test('reaches 5 twice', () => {
    const testData = ['-6', '+3', '+8', '+5', '-6'];
    expect(findDuplicateFrequency(testData, 0)).toBe(5);
  });

  test('reaches 14 twice', () => {
    const testData = ['+7', '+7', '-2', '-7', '-4'];
    expect(findDuplicateFrequency(testData, 0)).toBe(14);
  });
});
