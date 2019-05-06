type coords = {
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

export const convertPoints = (points: string[][]): coords[] => {
  return points.map(([x, y]) => ({
    x: +x,
    y: +y
  }));
};

type Point = {
  coords: coords;
  haveInfiniteArea: boolean;
  areaQ: number;
};

interface MatrixCell {
  areaOf: Point;
}

export const calculateManhattanDistance = (point: coords, originPoint: coords) => {
  return Math.abs(point.x - originPoint.x) + Math.abs(point.y - originPoint.y);
};
