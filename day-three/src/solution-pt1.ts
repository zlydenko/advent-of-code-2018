import { Coordinates, Slice } from "./slices";

export const parseFabricSlice = (input: string): Slice => {
  const [idStr, _, mainCoords, sizes] = input.split(" ");
  const sliceId: number = +idStr.replace("#", "");
  const startPointsStr: string[] = mainCoords.split(",");
  const startPoint: Coordinates = {
    x: +startPointsStr[0] + 1,
    y: +startPointsStr[1].replace(":", "") + 1
  };
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

export const findOverlapSize = (parsedData: Slice[]): number => {
  const coordsMap: Map<string, number> = parsedData.reduce((acc: Map<string, number>, value: Slice) => {
    value.coords.forEach((val: Coordinates) => {
      const key = `${val.x},${val.y}`;

      if (acc.has(key)) {
        const val = acc.get(key);
        //? i must do it because of typescript warning
        //? ts thinks that after i checked map has key value
        //? it still can be undefined .____.

        const counter = val === undefined ? 0 : val;
        acc.set(key, counter + 1);
      } else {
        acc.set(key, 1);
      }
    });
    return acc;
  }, new Map());

  coordsMap.forEach((value: number, key: string) => {
    if (value < 2) {
      coordsMap.delete(key);
    }
  });

  return coordsMap.size;
};

export const main = (data: string[]): number => {
  const allSlices: Slice[] = data.map(sliceData => parseFabricSlice(sliceData));
  const overlapSize: number = findOverlapSize(allSlices);

  return overlapSize;
};
