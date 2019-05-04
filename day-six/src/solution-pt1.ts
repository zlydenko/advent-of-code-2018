export const getMaxCoordValue = (input: string[][]): number => {
  const reducer = (acc: number, val: string[]) => {
    return acc > +val[0] ? (acc > +val[1] ? acc : +val[1]) : +val[0];
  };
  const result = input.reduce(reducer, 0);

  return result;
};
