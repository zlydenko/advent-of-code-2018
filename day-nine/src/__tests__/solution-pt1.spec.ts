import { MarbleCircle, insertBetween } from '../solution-pt1';
// import inputLoader from '~root/inputLoader';

describe('day 9 part 1', () => {
  test('set players', () => {
    const circle = new MarbleCircle(5);
    const players = circle.scores();

    expect(players.size).toBe(5);
  });

  test('insert element in array', () => {
    const arr = [0, 1];
    const newElem = 2;
    const output = insertBetween(arr, newElem, 0, 1);

    expect(output[1]).toBe(2);
  });

  test('insert element in array', () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const newElem = 5;
    const output = insertBetween(arr, newElem, 3, 4);

    expect(output[4]).toBe(5);
  });

  test('insert element in array', () => {
    const arr = [0];
    const newElem = 1;
    const output = insertBetween(arr, newElem, 0, 0);

    expect(output.length).toBe(2);
  });

  test('turns', () => {
    /*
      10 players; last marble is worth 1618 points: high score is 8317
      13 players; last marble is worth 7999 points: high score is 146373
      17 players; last marble is worth 1104 points: high score is 2764
      21 players; last marble is worth 6111 points: high score is 54718
      30 players; last marble is worth 5807 points: high score is 37305
    */
    const examples = {
      9: new MarbleCircle(9),
      10: new MarbleCircle(10),
      13: new MarbleCircle(13),
      17: new MarbleCircle(17),
      21: new MarbleCircle(21),
      30: new MarbleCircle(30)
    };

    let highScores = {
      9: 0,
      10: 0,
      13: 0,
      17: 0,
      21: 0,
      30: 0
    };

    examples['10'].makeTurns(1618);
    examples['13'].makeTurns(7999);
    examples['17'].makeTurns(1104);
    examples['21'].makeTurns(6111);
    examples['30'].makeTurns(5807);
    examples['9'].makeTurns(25);

    highScores['9'] = examples['9'].getWinnerScore();
    highScores['10'] = examples['10'].getWinnerScore();
    highScores['13'] = examples['13'].getWinnerScore();
    highScores['17'] = examples['17'].getWinnerScore();
    highScores['21'] = examples['21'].getWinnerScore();
    highScores['30'] = examples['30'].getWinnerScore();

    expect(highScores['9']).toBe(32);
    expect(highScores['10']).toBe(8317);
    expect(highScores['13']).toBe(146373);
    expect(highScores['17']).toBe(2764);
    expect(highScores['21']).toBe(54718);
    expect(highScores['30']).toBe(37305);
  });

  test('real data', async () => {
    const [playersCount, lastMarble]: number[] = [405, 71700];
    // await inputLoader('day-nine', (data: string) => {
    //   return data
    //     .split(' ')
    //     .filter(value => !isNaN(+value))
    //     .map(v => +v);
    // });
    const game = new MarbleCircle(playersCount);
    game.makeTurns(lastMarble);

    console.log(game.getWinnerScore());
  });
});
