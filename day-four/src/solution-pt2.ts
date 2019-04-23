const x = () => {}

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