class Node {
  constructor(value) {
    this.value = value;
  }
}

class CircularDoublyLinkedList {
  constructor(playersCount, lastMarble) {
    this.lastMarble = lastMarble;
    this.playersCount = playersCount;
    this.head = new Node(0);
    const secondNode = new Node(1);

    this.head.next = secondNode;
    this.head.prev = secondNode;

    secondNode.prev = this.head;
    secondNode.next = this.head;

    this.currentNode = secondNode;
    this.currentPlayer = 1;
    this.score = {};
  }

  appendNode(value) {
    //? get node next to current
    const nextOne = this.currentNode.next;
    //? get node next to next to current
    const afterNextOne = nextOne.next;
    //? create new node
    const newNode = new Node(value);

    /*
    before -> [0,1]
    after -> [0,2,1]
    */

    nextOne.next = newNode;
    afterNextOne.prev = newNode;

    newNode.prev = nextOne;
    newNode.next = afterNextOne;

    this.currentNode = newNode;

    return this;
  }

  toArray() {
    let currentNode = this.head;
    let result = [];

    while (currentNode.next !== this.head) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }

    result.push(this.head.prev.value);

    return result;
  }

  toString() {
    return this.toArray().join(",");
  }

  rewind(playerId, additionalScore) {
    const currentScore = this.score[playerId] || 0;
    let step = 7;
    let currentNode = this.currentNode;

    while (step > 0) {
      currentNode = currentNode.prev;
      step--;
    }

    const newCurrent = currentNode.next;

    currentNode.prev.next = newCurrent;
    newCurrent.prev = currentNode.prev;

    this.currentNode = newCurrent;

    const newScore = currentScore + currentNode.value + additionalScore;
    this.score[playerId] = newScore;

    return this;
  }

  play() {
    let startingMarble = 2;

    while (startingMarble <= this.lastMarble) {
      if (startingMarble % 23 === 0) {
        this.rewind(this.currentPlayer, startingMarble);
      } else {
        this.appendNode(startingMarble);
      }
      this.currentPlayer = (this.currentPlayer + 1) % this.playersCount;
      startingMarble++;
    }

    return this;
  }

  highScore() {
    return Object.values(this.score).reduce((acc, value) => (acc > value ? acc : value), 0);
  }
}

module.exports = CircularDoublyLinkedList;
