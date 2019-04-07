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

export const findOverlap = (parsedData: Slice[]): Coordinates[] => {
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

  //TODO: filter those, who have counter 1
  coordsMap.forEach((value: number, key: string) => {
    if (value < 2) {
      coordsMap.delete(key);
    }
  });

  const result: Coordinates[] = Array.from(coordsMap).map(([key, _]) => {
    const [x, y] = key.split(",");
    return { x: +x, y: +y };
  });

  return result;
};

export const getOverlapSize = (overlapCoords: Coordinates[]) => {
  return overlapCoords.length;
};
