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
