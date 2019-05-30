const CircularDoublyLinkedList = require('../circularDLL.class.js');

describe('circular doubly linked list', () => {
  test('init start', () => {
    const list = new CircularDoublyLinkedList(10);

    console.log(list);

    // list.appendAfterNthNode(2, 2);
    // console.log(list);
    // console.log(list.toArray());

    // list.appendAfterNthNode(2, 2);
    // list.appendAfterNthNode(3, 2);
    // list.appendAfterNthNode(4, 2);
    // list.appendAfterNthNode(5, 2);

    // for (let i = 2; i <= 20; i++) {
    //   list.appendAfterNthNode(i, 1);
    // }

    // console.log(list.toArray());
    // console.log(list);
  });
});
