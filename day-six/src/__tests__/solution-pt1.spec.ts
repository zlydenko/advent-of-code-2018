import inputLoader from '../inputLoader';
import {} from '../solution-pt1';

describe('day six', () => {
  let data: string[][] = [];
  let testData = [['1', '1'], ['1', '6'], ['8', '3'], ['3', '4'], ['5', '5'], ['8', '9']];

  beforeAll(async () => {
    data = await inputLoader();
  });

  test('it must load data', () => {
    expect(data).toHaveLength(50);
  });
});
