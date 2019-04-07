import { parseFabricSlice } from "./solution-pt1";
import { Coordinates, Slice, ParsedSliceInfo } from "./slices";

const parseCoords = (slices: Slice[]): Map<string, ParsedSliceInfo> => {
  const data = [...slices];

  return data.reduce((acc: Map<string, ParsedSliceInfo>, slice: Slice) => {
    const { id: sliceId, coords } = slice;

    coords.forEach((c: Coordinates) => {
      const { x, y } = c;
      const coordsStr = `${x},${y}`;
      const alreadyExists: boolean = acc.has(coordsStr);

      if (alreadyExists) {
        const value = acc.get(coordsStr);
        const counter = value === undefined ? 0 : value.count;
        const id = value === undefined ? String(sliceId) : value.id;
        acc.set(coordsStr, {
          id,
          count: counter + 1
        });
      } else {
        acc.set(coordsStr, {
          id: String(sliceId),
          count: 1
        });
      }
    });

    return acc;
  }, new Map());
};

export const findIntactSlice = (data: Slice[]): string => {
  const coordsData: Map<string, ParsedSliceInfo> = parseCoords(data);

  coordsData.forEach((value: ParsedSliceInfo, key: string) => {
    const { id, count } = value;

    if (count !== 1) {
      coordsData.delete(key);
    }
  });

  console.log(coordsData);

  return Array.from(coordsData)[0][1].id;
};
