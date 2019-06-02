interface Location {
  x: number;
  y: number;
}

interface PointI {
  position: Location;
  velocity: Location;
}

const cleanInput = (str: string): number[] => {
  return str
    .split(", ")
    .map((v: string) => v.replace("<", ""))
    .map((v: string) => v.replace(">", ""))
    .map((n: string) => +n);
};

export const parseInput = (data: string[]): PointI[] => {
  return data.map((str: string) => {
    const parsedStr: string[] | null = str.match(/\<.*?\>/g);
    if (!parsedStr) throw new Error("bad string");
    const [position, velocity] = parsedStr;
    const positionXY = cleanInput(position);
    const velocityXY = cleanInput(velocity);

    return {
      position: {
        x: positionXY[0],
        y: positionXY[1]
      },
      velocity: {
        x: velocityXY[0],
        y: velocityXY[1]
      }
    };
  });
};

export const getBoundaries = (data: PointI[]) => {
  return data.reduce(
    (acc, val) => {
      const {
        position: { x, y }
      } = val;

      return {
        maxPositiveX: acc.maxPositiveX > x ? acc.maxPositiveX : x,
        maxNegativeX: acc.maxNegativeX < x ? acc.maxNegativeX : x,
        maxPositiveY: acc.maxPositiveY > y ? acc.maxPositiveY : y,
        maxNegativeY: acc.maxNegativeY < y ? acc.maxNegativeY : y
      };
    },
    {
      maxPositiveX: 0,
      maxNegativeX: 0,
      maxPositiveY: 0,
      maxNegativeY: 0
    }
  );
};

export const buildMatrix = (
  maxPositiveX: number,
  maxNegativeX: number,
  maxPositiveY: number,
  maxNegativeY: number
): string[] => {
  const row: string = Array(-maxNegativeX + maxPositiveX + 1)
    .fill(".")
    .join("");
  const cols: string[] = Array(-maxNegativeY + maxPositiveY + 1)
    .fill(null)
    .map(_ => {
      return row;
    });

  return cols;
};

export const secondsGenerator = function*(
  seconds: number,
  initialPoints: PointI[]
): IterableIterator<{ currentSecond: number; points: PointI[] }> {
  let currentSecond = 0;
  let points = initialPoints;

  while (currentSecond < seconds) {
    points = points.map(({ position, velocity }) => {
      return {
        position: {
          x: position.x + velocity.x,
          y: position.y + velocity.y
        },
        velocity
      };
    });

    yield {
      currentSecond,
      points
    };

    currentSecond++;
  }
};

// export const movingPointsGenerator = function*(matrix: string[], points: PointI[], seconds: number): IterableIterator<any> {
//   let cleanMatrix = matrix;
//   let currentSecond = 0;

//   while(currentSecond < seconds) {
//     //todo: place points by the coordinates

//     //?
//     currentSecond++;
//   }
// };
