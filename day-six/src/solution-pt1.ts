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
