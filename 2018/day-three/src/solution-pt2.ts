import { parseFabricSlice } from "./solution-pt1";
import { Coordinates, Slice, ParsedSliceInfo } from "./slices";

export const parseCoords = (slices: Slice[]): Map<string, ParsedSliceInfo> => {
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
        const id = value === undefined ? [String(sliceId)] : [...value.id, String(sliceId)];
        acc.set(coordsStr, {
          id,
          count: counter + 1
        });
      } else {
        acc.set(coordsStr, {
          id: [String(sliceId)],
          count: 1
        });
      }
    });

    return acc;
  }, new Map());
};

export const getOverlapsIds = (parsedData: Map<string, ParsedSliceInfo>): string[] => {
  const haveOverlapsMap: Map<string, boolean> = Array.from(parsedData).reduce(
    (acc: Map<string, boolean>, [_coords, { id, count }]) => {
      //? id string[]

      id.forEach(idx => {
        if (!acc.has(idx)) {
          acc.set(idx, false);
        } else {
          if (count > 1) {
            acc.set(idx, true);
          }
        }
      });

      return acc;
    },
    new Map()
  );
  const haveOverlapsList = Array.from(haveOverlapsMap);
  const filteredWithoutOverlaps = haveOverlapsList.filter(([_id, ifHaveOverlaps]) => {
    return ifHaveOverlaps;
  });

  return filteredWithoutOverlaps.map(([id, haveOverlaps]) => id);
};

export const findIntactSlice = (data: Slice[]): string => {
  const coordsData: Map<string, ParsedSliceInfo> = parseCoords(data);
  const idsWithOverlaps: string[] = getOverlapsIds(coordsData);

  coordsData.forEach((value: ParsedSliceInfo, key: string) => {
    const { id } = value;

    if (id.find(idValue => idsWithOverlaps.includes(idValue)) !== undefined) {
      coordsData.delete(key);
    }
  });

  return Array.from(coordsData)[0][1].id[0];
};

export const main = (data: string[]): string => {
  const sliceData: Slice[] = data.map(str => parseFabricSlice(str));
  const result: string = findIntactSlice(sliceData);

  return result;
};
