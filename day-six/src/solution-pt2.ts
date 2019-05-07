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
