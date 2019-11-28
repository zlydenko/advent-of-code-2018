const { readFile } = require("fs");
const { resolve } = require("path");

const getInput = (path: string): Promise<string[][]> =>
  new Promise((resolve, reject) => {
    readFile(path, (err: any, data: any) => {
      if (err) reject(err);

      const result = Buffer.from(data)
        .toString("utf8")
        .split("\r\n");
      resolve(result.map(row => row.split("")));
    });
  });

let field: string[][] = [[]];
let carriages: Carriage[] = [];

const main = async () => {
  let iteration = 0;
  try {
    const inputPath = resolve(__dirname, "input.txt");
    const testPath = resolve(__dirname, "testData.txt");
    field = await getInput(testPath);

    field.forEach((row: string[], y) => {
      row.forEach((cell: string, x) => {
        switch (cell) {
          case ">":
            carriages.push(new Carriage({ x, y }, Direction.R));
            break;
          case "<":
            carriages.push(new Carriage({ x, y }, Direction.L));
            break;
          case "v":
            carriages.push(new Carriage({ x, y }, Direction.D));
            break;
          case "^":
            carriages.push(new Carriage({ x, y }, Direction.U));
            break;
        }
      });
    });

    while (true) {
      carriages.forEach((c, idx) => console.log(idx, c.currentPosition));
      tick();
      iteration++;

      if (carriages.length === 1) {
        throw new Error(JSON.stringify(carriages[0].currentPosition));
      }
    }
  } catch (error) {
    console.log("# of carriages", carriages.length);
    console.log("Iteration #", iteration);
    // console.log("ACCIDENT");
    console.log("last one");
    throw error;
  }
};

const tick = () => {
  //part one
  // carriages.forEach(carriage => carriage.move());

  let crashedCarriages: number[] = [];

  //part two
  for (let i = 0; i < carriages.length; i++) {
    const carriage = carriages[i];

    try {
      carriage.move();
    } catch (error) {
      crashedCarriages = JSON.parse(error.message);
      continue;
    }
  }

  carriages = carriages.reduce(
    (final: Carriage[], v, idx: number) => (crashedCarriages.includes(idx) ? final : [...final, v]),
    []
  );
};

enum LastTurn {
  L,
  S,
  R
}

enum Direction {
  L,
  U,
  R,
  D
}

type Coords = {
  x: number;
  y: number;
};

class Carriage {
  constructor(
    public currentPosition: Coords,
    public currentDirection: Direction,
    private lastTurn: LastTurn = LastTurn.R
  ) {}

  private getCurrentField() {
    const { x, y } = this.currentPosition;

    return field[y][x];
  }

  private makeStep() {
    switch (this.currentDirection) {
      case Direction.L:
        this.currentPosition.x--;
        break;
      case Direction.U:
        this.currentPosition.y--;
        break;
      case Direction.R:
        this.currentPosition.x++;
        break;
      case Direction.D:
        this.currentPosition.y++;
        break;
    }
  }

  private turnLeft() {
    switch (this.currentDirection) {
      case Direction.U:
        this.currentDirection = Direction.L;
        break;
      case Direction.L:
        this.currentDirection = Direction.D;
        break;
      case Direction.D:
        this.currentDirection = Direction.R;
        break;
      case Direction.R:
        this.currentDirection = Direction.U;
        break;
    }
  }
  private turnRight() {
    switch (this.currentDirection) {
      case Direction.U:
        this.currentDirection = Direction.R;
        break;
      case Direction.R:
        this.currentDirection = Direction.D;
        break;
      case Direction.D:
        this.currentDirection = Direction.L;
        break;
      case Direction.L:
        this.currentDirection = Direction.U;
        break;
    }
  }

  private checkAccident() {
    const result = carriages.filter(
      elem => elem.currentPosition.x === this.currentPosition.x && elem.currentPosition.y === this.currentPosition.y
    );
    return result.length > 1;
  }

  private findCrashedCarriages() {
    const result = carriages.reduce((acc: number[], elem: Carriage, idx: number) => {
      return elem.currentPosition.x === this.currentPosition.x && elem.currentPosition.y === this.currentPosition.y
        ? [...acc, idx]
        : acc;
    }, []);

    return result;
  }

  public move() {
    this.makeStep();

    //part one
    // if (this.checkAccident()) {
    //   throw new Error(JSON.stringify({ ...this.currentPosition }));
    // }

    //part two

    const crashedCarriages = this.findCrashedCarriages();

    if (crashedCarriages.length >= 2) {
      throw new Error(JSON.stringify(crashedCarriages));
    }

    switch (this.getCurrentField()) {
      case "/":
        this.currentDirection === Direction.U || this.currentDirection === Direction.D
          ? this.turnRight()
          : this.turnLeft();
        break;
      case "\\":
        this.currentDirection === Direction.U || this.currentDirection === Direction.D
          ? this.turnLeft()
          : this.turnRight();
        break;
      case "+":
        this.lastTurn = LastTurn[this.lastTurn] === "R" ? LastTurn.L : this.lastTurn + 1;

        if (this.lastTurn === LastTurn.L) {
          this.turnLeft();
        } else if (this.lastTurn === LastTurn.R) {
          this.turnRight();
        }

        break;
    }
  }
}

main();
