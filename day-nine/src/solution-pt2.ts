import LinkedList, { ListNode } from './linkedList.class';

export default class MarbleGame {
  playersCount: number;
  scores: Map<number, number>;
  currentPlayer: number;
  currentMarble: number;
  tempMarble: number | null = null;
  output: LinkedList<number>;
  lastMarble: number;

  constructor(players: number, lastMarble: number) {
    this.playersCount = players;
    this.scores = this._emptyScore(players);
    this.currentPlayer = 1;
    this.currentMarble = 0;
    this.output = new LinkedList<number>(0);
    this.lastMarble = lastMarble;
  }

  private _emptyScore(players: number): Map<number, number> {
    return Array(players)
      .fill(null)
      .map((_, id) => {
        return [id, 0];
      })
      .reduce((map, value) => {
        map.set(value[0] + 1, 0);
        return map;
      }, new Map());
  }

  play() {
    while (this.currentMarble !== this.lastMarble) {
      const prevMarble: number = this.currentMarble;
      const currentMarble: number = this.tempMarble === null ? prevMarble + 1 : this.tempMarble;
      const beforeNode: ListNode<number> = this.output.makeStepsClockwise(prevMarble, 1);
      const afterNode: ListNode<number> = this.output.makeStepsClockwise(prevMarble, 2);

      this.output.insertBetween(currentMarble, beforeNode, afterNode);
      this.currentMarble = currentMarble;
    }
  }

  getOutput() {
    return this.output.toString();
  }
}
