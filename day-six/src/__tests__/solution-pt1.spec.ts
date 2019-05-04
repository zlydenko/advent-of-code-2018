import inputLoader from '../inputLoader';

describe('day six', () => {
  test('it must load data', async () => {
    const data = await inputLoader();

    expect(data).toHaveLength(50);
  });
});
