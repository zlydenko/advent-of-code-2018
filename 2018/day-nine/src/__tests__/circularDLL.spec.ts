const CircularDoublyLinkedList = require("../circularDLL.class.js");

describe("circular doubly linked list", () => {
  test("part one solution", () => {
    const list = new CircularDoublyLinkedList(405, 71700);

    const output = list.play().highScore();

    expect(output).toBe(428690);

    //? 26 ms
  });

  test("part two solution", () => {
    const greater = 71700 * 100;

    const list = new CircularDoublyLinkedList(405, greater);

    const output = list.play().highScore();

    console.log(output);

    //? 3454 ms
  });
});
