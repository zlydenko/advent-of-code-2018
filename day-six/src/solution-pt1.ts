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

//? IterableIterator<coords[]> this fucking typescript type checked thinks that i can have UNDEFINED, when i def CANT

export const areaCreator = (startPoint: coords, endPoint: coords, originPoint: coords) => {
  let distance = 1;
  const memo = new Map();
  let x = 0;

  while (true) {
    const prevCoords: Set<string> = memo.get(distance - 1);
    const cachedNeighbours = new Set();

    if (prevCoords) {
      Array.from(prevCoords).forEach((value: string) => {
        const [x, y] = value.split(",");
        const neighbours = findNeighbours({ x: +x, y: +y }, startPoint, endPoint);

        neighbours.forEach(coords => {
          if (coords.x !== originPoint.x && coords.y !== originPoint.y) {
            cachedNeighbours.add(`${coords.x},${coords.y}`);
          }
        });
      });
    } else {
      const neighbours = findNeighbours(originPoint, startPoint, endPoint);
      neighbours.forEach(coords => {
        cachedNeighbours.add(`${coords.x},${coords.y}`);
      });
    }

    const thereNoNeighbours = cachedNeighbours.size === 0;

    if (thereNoNeighbours) break;

    memo.set(distance, cachedNeighbours);
    distance++;
    x++;
  }

  return memo;
};

// export const areaGenerator = function*(
//   startPoint: coords,
//   endPoint: coords,
//   originPoint: coords
// ): IterableIterator<any> {
//   let distance = 1;
//   let freeSpaceOver = false;
//   let memo: Map<number, Set<string>> = new Map();

//   //? Map( 1 => Set('1,1','2,0','1,2') )

//   while (!freeSpaceOver) {
//     const prevCoords = memo.has(distance - 1) ? memo.get(distance - 1) : null;
//     const cachedNeighbours = new Set();

//     if (!prevCoords) {
//       const neighbours = findNeighbours(originPoint, startPoint, endPoint);

//       if (neighbours.length === 0) {
//         freeSpaceOver = true;
//       } else {
//         neighbours.forEach(({ x, y }) => cachedNeighbours.add(`${x},${y}`));
//       }
//     } else {
//       Array.from(prevCoords).forEach(coords => {
//         const c = coords.split(",");
//         const parsedCoords = {
//           x: +c[0],
//           y: +c[1]
//         };
//         const neighbours = findNeighbours(parsedCoords, startPoint, endPoint);

//         if (neighbours.length === 0) {
//           freeSpaceOver = true;
//         } else {
//           neighbours.forEach(({ x, y }) => cachedNeighbours.add(`${x},${y}`));
//         }
//       });
//     }

//     memo.set(distance, cachedNeighbours);

//     if (freeSpaceOver) break;

//     yield Array.from(memo.get(distance) || []);

//     distance++;
//   }
// };
