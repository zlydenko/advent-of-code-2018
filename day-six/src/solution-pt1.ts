import { Area } from "./area.class";

export type coords = {
  x: number;
  y: number;
};

export const getBorderPoint = (points: string[][]): coords => {
  const maxValue: number = +points
    .reduce((acc, val) => {
      return acc.length === 0 ? val : [...acc, ...val];
    }, [])
    .sort((a, b) => +b - +a)[0];

  return {
    x: maxValue,
    y: maxValue
  };
};

export const createMatrix = (borderPoint: coords, startPoint: coords = { x: 0, y: 0 }): any[][] => {
  return Array(borderPoint.x - startPoint.x + 1)
    .fill(null)
    .map(_ => Array(borderPoint.y - startPoint.y + 1));
};

const convertPoint = (point: string[]): coords => ({ x: +point[0], y: +point[1] });

export const convertPoints = (points: string[][]): coords[] => {
  return points.map(convertPoint);
};

export const calculateManhattanDistance = (point: coords, originPoint: coords): number => {
  return Math.abs(point.x - originPoint.x) + Math.abs(point.y - originPoint.y);
};

export const getClosestPointIdx = (x: number, y: number, points: coords[]): number | null => {
  const distances: Map<number, number[]> = new Map();

  points.forEach((point: coords, idx: number) => {
    const manhattanDistance = calculateManhattanDistance({ x, y }, point);
    const idsWithSameDistance = distances.get(manhattanDistance);

    idsWithSameDistance
      ? distances.set(manhattanDistance, [...idsWithSameDistance, idx])
      : distances.set(manhattanDistance, [idx]);
  });

  const [_, closestDistanceIds]: [number, number[]] = Array.from(distances).sort((a, b) => {
    return a[0] - b[0];
  })[0];

  return closestDistanceIds.length > 1 ? null : closestDistanceIds[0];
};

// export const calculatePointsAreas = (matrix: any[][], points: coords[]) => {
//   const pointAreas: Area[] = points.map((point: coords) => new Area(point));

//   matrix.forEach((_r, x) => {
//     const cells = _r.forEach((_, y) => {
//       //? get which point's part of area this cell
//       const closestPointId = getClosestPointIdx(x, y, points);

//       if (closestPointId) {
//         //? if this cell is part of area - set new data to area and check if this border row or cell
//       }
//       //? if it is - check area is infinite
//       //? if cell is not part of points area - do nothing
//     });
//   });
// };
