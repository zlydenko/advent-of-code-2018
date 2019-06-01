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

    this.play();
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

  private _saveScore(playerId: number, deletedMarble: number, currentMarble: number): void {
    const currentScore = this.scores.get(playerId) || 0;

    this.scores.set(playerId, currentScore + deletedMarble + currentMarble);
  }

  private play(): void {
    while (this.currentMarble <= this.lastMarble) {
      const prevMarble: number = this.currentMarble;
      const currentMarble: number = this.tempMarble === null ? prevMarble + 1 : this.tempMarble;

      //? check if currentMarble % 23
      if (currentMarble % 23 === 0) {
        //? delete node -7 of prevMarble
        const deleteNode: ListNode<number> = this.output.makeStepsCounterClockwise(prevMarble, 7);
        let nextByDeletedNode = deleteNode.next;
        if (nextByDeletedNode === null && this.output.head !== null) {
          nextByDeletedNode = this.output.head;
        } else if (nextByDeletedNode === null && this.output.head === null) {
          throw new Error('shiet');
        } else if (nextByDeletedNode !== null) {
          //? calculate player score
          this._saveScore(this.currentPlayer, deleteNode.value, currentMarble);
          //? save to tempMarble currentMarble+1
          this.tempMarble = currentMarble + 1;
          //? currentMarble is next by deleted node
          this.currentMarble = nextByDeletedNode.value;
          //? delete node
          this.output.deleteNode(deleteNode);
        }
      } else {
        const beforeNode: ListNode<number> = this.output.makeStepsClockwise(prevMarble, 1);
        const afterNode: ListNode<number> = this.output.makeStepsClockwise(prevMarble, 2);

        this.output.insertBetween(currentMarble, beforeNode, afterNode);
        this.currentMarble = currentMarble;
        if (this.tempMarble !== null) this.tempMarble = null;
      }

      if (this.tempMarble !== null && this.tempMarble > this.lastMarble) {
        break;
      }

      this.currentPlayer = this.currentPlayer === this.playersCount ? 1 : this.currentPlayer + 1;
    }
  }

  getOutput(): number[] {
    return this.output.toArray();
  }

  getScores(): Map<number, number> {
    return this.scores;
  }

  getHighScore(): number {
    return Array.from(this.scores).reduce((highestScore, currentPlayerState) => (currentPlayerState[1] < highestScore ? highestScore : currentPlayerState[1]), 0);
  }
}
