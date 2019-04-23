import {ShiftI} from './solution-pt1'

//we use sort by date & reducer of shifts from part 1

//map shifts state to guard id and slept minutes [][]
//filter to common elements and keep track of how many times minute get filtered
//sort by most freq minute
//return result

export const findCommonMinutes = (data: number[][]): [number,number] => {
    const filteredOut = data.reduce((acc: Map<number,number>,val: number[]) => {
        val.forEach(minute => {
            const storedValue = acc.get(minute);
            if (!storedValue) {
                acc.set(minute, 1);
            } else {
                acc.set(minute, storedValue+1);
            }
        })
        
        return acc
    }, new Map())

    const mostFrequent = Array.from(filteredOut).reduce((acc: [number,number], val: [number,number]) => {
        return acc[1] > val[1] ? acc : [val[0],val[1]]
    }, [0,0])

    return mostFrequent
}

type guardId = number;
type minutesSlept = Array<number[]>;

const mostFrequentSleptReducer = (acc: Map<guardId, minutesSlept>, val: ShiftI) => {
    const storedShift = acc.get(val.guardId);

    if (!storedShift) {
        const sleptMinutes = new Array();
        sleptMinutes.push(...val.sleepMinAM);
        acc.set(val.guardId, [sleptMinutes]);
    } else {
        const sleptMinutes = storedShift;
        acc.set(val.guardId, [...sleptMinutes, [...val.sleepMinAM]]);
    }

    return acc
}

export const mostFrequentSleep = (input: ShiftI[]): Map<guardId,minutesSlept> => {
    return input.reduce(mostFrequentSleptReducer, new Map());
}

export const getResult = (reducedShifts: Map<guardId,minutesSlept>): number => {
    const [guardId, mostFreqMinute, _counter] = Array.from(reducedShifts).reduce((acc: [number,number, number], val: [number, number[][]]) => {
        const minutesSlept = [...val[1]];
        const [mostFreqMinute, freqMinuteCount] = findCommonMinutes(minutesSlept);
        
        return acc[2] > freqMinuteCount ? acc : [val[0], mostFreqMinute, freqMinuteCount]
    }, [0,0,0]);

    return guardId * mostFreqMinute
}