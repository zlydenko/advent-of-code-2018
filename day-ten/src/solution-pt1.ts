interface PointI {
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
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
