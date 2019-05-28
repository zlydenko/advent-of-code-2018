import { MarbleCircle, insertBetween } from "../solution-pt1";

describe("day 9 part 1", () => {
  test("set players", () => {
    const circle = new MarbleCircle(5);
    const players = circle.scores();

    console.log("players list", players);

    expect(players.size).toBe(5);
  });

  // test('initial turn', () => {
  //   const circle = new MarbleCircle(5);
  //   circle.newTurn();

  //   expect(circle.getOutput()).toEqual(expect.arrayContaining([0]));
  // });

  test("insert element in array", () => {
    const arr = [0, 1];
    const newElem = 2;
    const output = insertBetween(arr, newElem, 0, 1);

    expect(output[1]).toBe(2);
  });

  test("insert element in array", () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const newElem = 5;
    const output = insertBetween(arr, newElem, 3, 4);

    expect(output[4]).toBe(5);
  });

  test("insert element in array", () => {
    const arr = [0];
    const newElem = 1;
    const output = insertBetween(arr, newElem, 0, 0);

    expect(output.length).toBe(2);
  });

  test("turns", () => {
    const circle = new MarbleCircle(9);
    circle.makeTurns(25); //? 25 -> last marble worth points
    const highScore = circle.getWinnerScore();

    expect(highScore).toBe(32);
  });
});
