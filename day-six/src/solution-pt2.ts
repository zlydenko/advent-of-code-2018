import { coords, SafeRegion } from './types';
import { calculateManhattanDistance } from './solution-pt1';

export const calculateSumManhattanDistances = (originPoint: coords, points: coords[]): number => {
  return points.reduce((acc, point) => {
    return (acc += calculateManhattanDistance(originPoint, point));
  }, 0);
};

export const isPointInRegion = (sum: number, region: SafeRegion): boolean => {
  return sum < region.getMaxDistance();
};

export const calculateSafeRegion = (matrix: any[][], points: coords[], regionInstance: SafeRegion): SafeRegion => {
  const width = matrix.length - 1;
  const height = matrix[0].length - 1;

  for (let x = 0; x <= width; x++) {
    for (let y = 0; y <= height; y++) {
      const sum = calculateSumManhattanDistances({ x, y }, points);
      const isInRegion = isPointInRegion(sum, regionInstance);

      if (isInRegion) {
        regionInstance.increase();
      }
    }
  }

  return regionInstance;
};
