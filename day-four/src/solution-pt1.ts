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

interface ShiftI {
  guardId: number;
  sleep: number;
  sleepMinAM: number[];
  status: ShiftState;
}

export enum ShiftState {
  STARTED,
  SLEEP,
  WAKE,
  FINISHED
}

export const getState = (input: string): ShiftState => {
  if (input.includes("asleep")) {
    return ShiftState.SLEEP;
  } else if (input.includes("wakes up")) {
    return ShiftState.WAKE;
  } else {
    return ShiftState.STARTED;
  }
};

export const guardShiftsReducer = (acc: ShiftI[], data: string, _i: number, arr: string[]) => {
  //? check if we have already processing shift
  const lastShift = acc[acc.length - 1];
  const currentState = getState(data);

  if (!lastShift) {
    const currentGuardId = data.split("#")[1].split(" ")[0];
    //TODO: pretty regex here pls
    acc.push({
      guardId: +currentGuardId,
      sleep: 0,
      sleepMinAM: [],
      status: currentState
    });
  } else {
    const currentGuardId = currentState === ShiftState.STARTED ? data.split("#")[1].split(" ")[0] : lastShift.guardId;

    //? if new shift starts need to finish last shift
    if (currentState === ShiftState.STARTED) {
      lastShift.status = ShiftState.FINISHED;

      //? add new shift to acc
      acc.push({
        guardId: +currentGuardId,
        sleep: 0,
        sleepMinAM: [],
        status: currentState
      });
    } else if (currentState === ShiftState.SLEEP || currentState === ShiftState.WAKE) {
      lastShift.status = currentState;

      //? get current minute AM

      //TODO: pretty regex here
      const currentMinAM = +data
        .split(" ")[1]
        .split("]")[0]
        .split(":")[1];

      //? counting
      if (currentState === ShiftState.SLEEP) {
        lastShift.sleepMinAM.push(currentMinAM);
      } else {
        //? count total for sleeping and push all minutes
        const startedSleeping = lastShift.sleepMinAM[lastShift.sleepMinAM.length - 1];
        const slept = currentMinAM - startedSleeping;
        lastShift.sleep += slept;
        lastShift.sleepMinAM.push(
          ...Array(slept - 1)
            .fill(startedSleeping)
            .map((start, i) => start + i + 1)
        );
      }
    }
  }

  return acc;
};

export const parseInputByShifts = (input: string[]): ShiftI[] => {
  return input.reduce(guardShiftsReducer, []);
};

export const findCommonElements = (input: number[][]): number[] => {
  return input.reduce((acc: number[], current: number[]) => {
    return acc.length === 0 ? current : acc.filter(value => current.find(x => x === value));
  }, []);
};

export const calculateResult = (data: ShiftI[]): number => {
  const sleepingData: Map<number, number> = data.reduce((acc: Map<number, number>, currentShift: ShiftI) => {
    const guardId = currentShift.guardId;
    const shift = acc.get(guardId);

    if (shift) {
      acc.set(guardId, shift + currentShift.sleep);
    } else {
      acc.set(guardId, currentShift.sleep);
    }
    return acc;
  }, new Map());

  const sortByMostSlept: [number, number][] = Array.from(sleepingData).sort(
    (a: [number, number], b: [number, number]) => {
      return b[1] - a[1];
    }
  );

  return sortByMostSlept[0][0];
};
