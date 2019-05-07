import { Area } from '../area.class';

describe('area instance', () => {
  test('it must create valid Area', () => {
    const origin = {
      x: 1,
      y: 1
    };
    const testArea = new Area(origin);

    testArea.increase();
    testArea.isInfinite();

    const expected = {
      size: 1,
      infinite: true
    };

    expect(testArea).toBeInstanceOf(Area);
    expect(testArea.info()).toEqual(expect.objectContaining(expected));
  });
});
