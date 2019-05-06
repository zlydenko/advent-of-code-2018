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

interface MatrixCell {
  coords: coords;
  areaOf: Point | null;
}

export const calculateManhattanDistance = (point: coords, originPoint: coords) => {
  return Math.abs(point.x - originPoint.x) + Math.abs(point.y - originPoint.y);
};

export class Point {
  coords: coords;
  haveInfiniteArea: boolean;
  areaQ: number;

  constructor(coords: coords) {
    this.coords = coords;
    this.haveInfiniteArea = false;
    this.areaQ = 0;
  }

  isFinite() {
    return !this.haveInfiniteArea;
  }

  setInfinite() {
    this.haveInfiniteArea = true;
  }

  addArea() {
    this.areaQ++;
  }

  getAreaQuantity() {
    return this.areaQ;
  }
}

export const pointsFab = (coords: coords): Point => new Point(coords);

export const getCellInfo = (x: number, y: number, points: coords[]): MatrixCell => {
  const coords = { x, y };
};

// export const calculatePointsAreas = (matrix: any[][], points: coords[]): MatrixCell[] => {
//   return matrix.reduce((rowsAcc, _rows, x) => {
//     const cells = _rows.reduce((cellsAcc, _, y) => {
//       const calculateCell = ['test'];

//       return cellsAcc.length === 0 ? calculateCell : [...cellsAcc, calculateCell];
//     }, []);

//     return rowsAcc.length === 0 ? cells : [...rowsAcc, ...cells];
//   }, []);
// };
