const initialState: string =
  "##..#.#.#..##..#..##..##..#.#....#.....##.#########...#.#..#..#....#.###.###....#..........###.#.#..";
const notes: string = `...## => #
#..#. => #
.#... => #
##... => #
#...# => #
.#..# => #
##### => #
..#.# => #
.#.## => #
.#### => #
##.## => #
#.##. => #
#.#.. => #`;

class SubterraneanSustainability {
  initialArray: string[] = [];
  patterns: string[] = [];

  constructor(private initialState: string, private notes: string) {
    this.initialArray = initialState.split("");
    this.patterns = notes.split("\n");
  }

  private findOccurance(state: string, pattern: string, idx: number = 0): number | null {
    if (idx >= state.length) return null;

    const result = state.indexOf(pattern, idx);

    return result;
  }

  private findOccurances(state: string[], note: string) {
    const [pattern, result] = note.split("=>").map(v => v.trim());
    const stateStr: string = state.join("");

    let occurances: number[] = [];
    let lastIndex: number | null = 0;

    while (true) {
      const occurancy = this.findOccurance(stateStr, pattern, lastIndex === 0 ? 0 : lastIndex);

      if (occurancy !== -1 && occurancy !== null) {
        occurances.push(occurancy + 2);
        lastIndex = occurancy + 1;
      } else {
        break;
      }
    }

    return occurances;
  }

  private calculateNewGeneration(state: string[]) {
    const infiniteState: string[] = [".", ".", ".", ".", ".", ...state, ".", ".", ".", ".", "."];
    const negativeIndex = 5;
    const replacing = new Set();

    this.patterns.forEach((pattern: string) => {
      const idxs = this.findOccurances(infiniteState, pattern);

      // console.log(pattern, idxs);

      idxs.forEach(idx => {
        replacing.add(idx);
      });
    });

    const resultState = infiniteState.map((_: string, idx: number) => (replacing.has(idx) ? "#" : "."));
    const firstPlantIdx = resultState.indexOf("#");
    const slicedState = resultState.slice(firstPlantIdx);
    // console.log(slicedState.join(""));

    return {
      state: slicedState,
      negativeIdx: negativeIndex - firstPlantIdx
      // negativeIdx: 5
    };
  }

  public partOne() {}

  public partTwo() {}

  public try() {
    let oldGeneration: string[] = this.initialArray;
    let negIdx: number = 0;
    let genSum: number = 0;

    // console.log(oldGeneration.join(""));

    for (let i = 0; i < 2000; i++) {
      const { state, negativeIdx } = this.calculateNewGeneration(oldGeneration);
      oldGeneration = state;
      negIdx += negativeIdx;
      // console.log(oldGeneration.join(""));
      const sum = oldGeneration.reduce((acc: number, value: string, idx: number) => {
        const result = value === "#" ? acc + idx - negIdx : acc;
        return result;
      }, 0);
      console.log(sum - genSum);
      genSum = sum;
    }

    console.log(genSum);
  }
}

const testState = "#..#.#..##......###...###";
const testNotes = `...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;

const zzz = new SubterraneanSustainability(initialState, notes);
zzz.try();
