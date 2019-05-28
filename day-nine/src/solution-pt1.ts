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

  // private _initialTurn(): void {
  //   this.output = [0];
  //   this.currentPlayer = 0;
  // }

  *turnGenerator(iterations: number): IterableIterator<any> {
    let i = 0;

    while (i < iterations) {
      const currentPlayer = this.currentPlayer;
      const currentMarble = this.currentMarble;
      const currentMarbleIdx = this.output.indexOf(currentMarble);

      const beforeIdx = (currentMarbleIdx + 1) % this.output.length;
      const afterIdx = (currentMarbleIdx + 2) % this.output.length;
      this.output = insertBetween(this.output, this.marbleId, beforeIdx, afterIdx);

      yield {
        output: this.output,
        playedBy: currentPlayer
      };

      this.currentMarble++;
      this.marbleId++;
      this.currentPlayer++;

      i++;
    }
  }

  // newTurn(): void {
  //   //todo: need to refactor & simplify
  //   //* we need to store current marble & incr id for marble (23 ? +2 : +1)
  //   //* current marble needed only for positioning
  //   //* marble id need to keep scores

  //   if (this.currentPlayer === null) {
  //     this._initialTurn();
  //   } else {
  //     this.currentPlayer = this.currentPlayer === this.playersCounter ? 1 : this.currentPlayer + 1;

  //     const currentMarble = this.currentMarble;
  //     const currentMarbleIdx = this.output.indexOf(currentMarble);
  //     const newMarble = this.marbleId;

  //     if (newMarble % 23 === 0) {
  //       //? new score to the player
  //       const currentScore = this.playersScores.get(this.currentPlayer) || 0;

  //       //? get marble 7 marbles counter-clockwise
  //       const deletedMarbleIdx = this.output.indexOf(this.currentMarble) - 7;
  //       //? add to score
  //       const deletedMarble = this.output[deletedMarbleIdx];
  //       this.playersScores.set(this.currentPlayer, currentScore + newMarble + deletedMarble);
  //       //? remove from array
  //       const before = this.output.slice(0, deletedMarbleIdx);
  //       const after = this.output.slice(deletedMarbleIdx + 1);
  //       this.output = [...before, ...after];
  //       this.currentMarble = this.output[deletedMarbleIdx];
  //       this.marbleId++;
  //     } else {
  //       //? get c.m.+1
  //       const beforeIdx = (currentMarbleIdx + 1) % this.output.length;
  //       //? get c.m.+2
  //       const afterIdx = (currentMarbleIdx + 2) % this.output.length;
  //       //? place new marble between
  //       this.output = insertBetween(this.output, newMarble, beforeIdx, afterIdx);
  //       this.currentMarble = newMarble;
  //     }
  //     this.marbleId++;
  //   }
  // }
}
