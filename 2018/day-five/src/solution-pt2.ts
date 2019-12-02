import {unit, polymerAfterReactions} from './solution-pt1'

export const getAllPossiblePolymers = (input:string): Array<string> => {
    const uniqueUnits: Set<unit> = new Set(Array(...input.toLowerCase()))
    const allPossibleVariants = Array.from(uniqueUnits).map((value: unit) => {
        const replacePattern = new RegExp(value, 'gi');
        return input.replace(replacePattern, '')
    })

    return allPossibleVariants
}

//? types problems -> stackoverflow
export const getShortestPolymer = (input:string): any[] => {
    const allPossiblePolymers = getAllPossiblePolymers(input);
    //? check why typescript doesnt want to set type [string,number] to acc
    const shortestPolymer = allPossiblePolymers
        .reduce((acc: any[], polymer: string) => {
        const polymerAfterAllReactions = polymerAfterReactions(polymer)
        
        if (acc[1] === 0) return [polymerAfterAllReactions, polymerAfterAllReactions.length]

        return acc[1] < polymerAfterAllReactions.length ? acc : [polymerAfterAllReactions, polymerAfterAllReactions.length]
    }, ['',0])

    return shortestPolymer
}