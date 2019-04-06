// at least 1000 inches in one size

interface Coordinates {
  x: number;
  y: number;
}

interface Slice {
  id: number;
  coords: Coordinates[];
}

export const parseFabricSlice = (input: string): Slice => {
  const [idStr, _, mainCoords, sizes] = input.split(" ");
  const sliceId: number = +idStr.replace("#", "");
  const startPointsStr: string[] = mainCoords.split(",");
  const startPoint: Coordinates = {
    x: +startPointsStr[0] + 1,
    y: +startPointsStr[1].replace(":", "") + 1
  };
  // const sliceSize: number = sizes.split("x").reduce((acc: number, value: string) => acc * +value, 1);
  // const coords = Array(sliceSize)
  //   .fill(undefined)
  //   .map((_: undefined, idx: number) => {

  //   });
  const [height, width] = sizes.split("x");
  const coords: Coordinates[] = Array(+height)
    .fill(undefined)
    .reduce((acc: any[], _: undefined, rowIdx: number) => {
      const row = rowIdx;

      //y
      const cells: number[] = Array(+width)
        .fill(undefined)
        .map((_: undefined, colIdx: number) => {
          const col = colIdx;
          return startPoint.y + col;
        });
      const res: Coordinates[] = cells.map((y: number) => {
        return {
          x: startPoint.x + row,
          y
        };
      });

      return [...acc, ...res];
    }, []);

  return {
    id: sliceId,
    coords
  };
};
