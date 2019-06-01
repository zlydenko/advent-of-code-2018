import MarbleGame from '../solution-pt2';
import { MarbleCircle } from '../solution-pt1';

//? 100.000 marbles -> 42s (prev impl)

describe('day 9, part 2', () => {
  test('example game', () => {
    const game = new MarbleGame(10, 1618);
    const highScore = game.getHighScore();

    expect(highScore).toBe(8317);

    //? 16ms
  });

  test('example game', () => {
    const game = new MarbleGame(13, 7999);
    const highScore = game.getHighScore();

    expect(highScore).toBe(146373);

    //? 207ms
  });

  test('example game', () => {
    const game = new MarbleGame(17, 1104);
    const highScore = game.getHighScore();

    expect(highScore).toBe(2764);

    //? 15ms
  });

  test('example game', () => {
    const game = new MarbleGame(21, 6111);
    const highScore = game.getHighScore();

    expect(highScore).toBe(54718);

    //? 150ms
  });

  test('example game', () => {
    const game = new MarbleGame(30, 5807);
    const highScore = game.getHighScore();

    expect(highScore).toBe(37305);

    //? 136ms
  });

  test('part 1 solution (new algo)', () => {
    const game = new MarbleGame(405, 71700);
    const highScore = game.getHighScore();

    expect(highScore).toBe(428690);

    //? 21479ms
  });

  test('part 1 solution (prev algo)', () => {
    const [playersCount, lastMarble]: number[] = [405, 71700];
    const game = new MarbleCircle(playersCount);
    game.makeTurns(lastMarble);
    const highScore = game.getWinnerScore();

    expect(highScore).toBe(428690);

    //? 47140ms
  });

  //! it took >15min (i stopped process)
  //test('part two', () => {
  //  const lastMarble = 71700;
  // const largerValue = lastMarble * 10;
  // const game = new MarbleGame(405, largerValue);
  // const highScore = game.getHighScore();
  // });
});
