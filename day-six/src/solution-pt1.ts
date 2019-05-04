export const getMaxCoordValue = (input: string[][]): number => {
  return input
    .flat()
    .map(value => +value)
    .sort((a, b) => b - a)[0];
};

//todo: it can be better
export const findNeighbours = (location: coords, max: coords): coords[] => {
  const { x, y } = location;
  const isValid = (c: coords): boolean => c.x >= 0 && c.y >= 0 && c.x <= max.x && c.y <= max.y;
  const result = [{ x: x - 1, y }, { x: x + 1, y }, { x, y: y - 1 }, { x, y: y + 1 }];

  return result.filter((c: coords) => isValid(c));
};

//todo area coordinates by manhattan distance generator

type coords = {
  x: number;
  y: number;
};

// const areaGenerator = function*(borderPoint: coords, originPoint: coords): IterableIterator<coords[]> {
//   let distance = 1;
//   let freeSpaceOver = false;

//   while(!freeSpaceOver) {
//     // yield [{ x: 1, y: 2 }];

//   }
// };
