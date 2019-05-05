export const getMaxCoordValue = (input: string[][]): number => {
  return input
    .flat()
    .map(value => +value)
    .sort((a, b) => b - a)[0];
};

export const getMinCoordValue = (input: string[][]): number => {
  return input
    .flat()
    .map(value => +value)
    .sort((a, b) => a - b)[0];
};

//todo: it can be better
export const findNeighbours = (location: coords, min: coords, max: coords): coords[] => {
  const { x, y } = location;
  const isValid = (c: coords): boolean => c.x >= min.x && c.y >= min.y && c.x <= max.x && c.y <= max.y;
  const result = [{ x: x - 1, y }, { x: x + 1, y }, { x, y: y - 1 }, { x, y: y + 1 }];

  return result.filter((c: coords) => isValid(c));
};

//todo area coordinates by manhattan distance generator

type coords = {
  x: number;
  y: number;
};

const areaGenerator = function*(startPoint: coords, endPoint: coords, originPoint: coords): IterableIterator<coords[]> {
  let distance = 1;
  let freeSpaceOver = false;
  let memo: Map<number, Set<string>> = new Map();

  //? Map( 1 => Set('1,1','2,0','1,2') )

  while (!freeSpaceOver) {
    // yield [{ x: 1, y: 2 }];
  }
};
