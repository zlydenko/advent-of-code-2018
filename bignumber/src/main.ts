export const getNextBigNumber = (n: number): number => {
  const numbers = String(n)
    .split("")
    .map(x => Number(x));

  for (let i = numbers.length - 1; i > 0; i--) {
    const lastNumber = numbers[i];
    const firstNumbers = numbers.slice(0, -i);

    let k = firstNumbers.length - 1;

    while(k >= 0) {
      
    }
  }
  return n;
};
