export const insertBetween = (arr: number[], inserting: number, beforeIdx: number, afterIdx: number): number[] => {
  const before = arr.slice(0, beforeIdx + 1);
  const after = afterIdx === 0 ? [] : arr.slice(afterIdx);
  return [...before, inserting, ...after];
};

interface TurnI {
  playedBy: number;
}

export class MarbleCircle {
  private output: number[] = [0];
  private playersScores: Map<number, number> = new Map();
  private currentPlayer: number = 1;
  private currentMarble: number = 0;
  private marbleId: number = 1;
  private playersCounter: number;

  constructor(players: number) {
    this.playersCounter = players;
    this._setPlayers(players);
  }

  private _setPlayers(n: number): void {
    Array(n)
      .fill(null)
      .forEach(_ => {
        this.playersScores.set(this.playersScores.size + 1, 0);
      });
  }

  scores(): Map<number, number> {
    return this.playersScores;
  }

  getOutput(): number[] {
    return this.output;
  }

  makeTurns(iterations: number): void {
    let i = 1;

    while (i <= iterations) {
      console.log("current iteration", i);
      //? iteration #24
      const currentPlayer = this.currentPlayer;
      const currentMarble = this.currentMarble;
      //? current marble -> 19
      const currentMarbleIdx = this.output.indexOf(currentMarble);
      //? index of 19

      console.log("current marble", currentMarble);

      if (this.marbleId % 23 === 0) {
        const currentPlayerScore = this.playersScores.get(currentPlayer) || 0;
        const deletingIdx = this.output.indexOf(currentMarble) - 7;
        const deletedMarble = this.output[deletingIdx];

        this.playersScores.set(currentPlayer, currentPlayerScore + this.marbleId + deletedMarble);

        const before = this.output.slice(0, deletingIdx);
        const after = this.output.slice(deletingIdx + 1);
        this.output = [...before, ...after];

        this.currentMarble = this.output[deletingIdx];
      } else {
        //? find next to 19 +1 and 19 +2
        const beforeIdx = (currentMarbleIdx + 1) % this.output.length;
        const afterIdx = (currentMarbleIdx + 2) % this.output.length;
        console.log("before", beforeIdx);
        console.log("after", afterIdx);
        this.output = insertBetween(this.output, this.marbleId, beforeIdx, afterIdx);
        this.currentMarble++;
        // this.currentMarble = this.marbleId + 1; //doesnt work

        //? outputs 24 between right indexes
        //! current marble + 1, so current marble became 20, but it is 24
      }

      this.marbleId++;
      this.currentPlayer = this.currentPlayer < this.playersCounter ? this.currentPlayer + 1 : 1;

      i++;
      console.log(this.output);
    }
  }

  getWinnerScore(): number {
    return Array.from(this.playersScores).reduce((winnerScore, [_, score]) => {
      return winnerScore > score ? winnerScore : score;
    }, 0);
  }
}
