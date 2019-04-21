export const extractDate = (input: string): string => {
  //TODO: write here pretty regex
  return input.split("]")[0].split("[")[1];
};

export const parseDate = (input: string): Date => {
  const [date, time] = input.split(" ");
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");

  return new Date(+year, +month - 1, +day, +hour, +minute);
};

export const sortInputByDate = (input: string[]): string[] => {
  return input.sort((a, b) => {
    return +parseDate(extractDate(a)) - +parseDate(extractDate(b));
  });
};
