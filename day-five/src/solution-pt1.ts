type unit = string;

export const unitsHaveSameType = (units: [unit,unit]):boolean => {
    return units[0].toLowerCase() === units[1].toLowerCase()
}

export const unitsHaveSamePolarity = (units: [unit,unit]):boolean => {
    return units[0] === units[1]
}

export const isReact = (units: [unit,unit]): boolean => {
    return unitsHaveSameType(units) ? !unitsHaveSamePolarity(units) : false;
}

export const polymerReactingReducer = (acc: string, currentUnit: unit) => {
    const isUnitsAvailable = acc.length > 0;
    const lastUnit = acc[acc.length - 1] || null
    const reacted = lastUnit ? isReact([lastUnit, currentUnit]) : null
    
    return isUnitsAvailable ? (reacted ? acc.slice(0,-1) : acc + currentUnit) : currentUnit
}

export const polymerAfterReactions = (input: string):string => {
    return Array(...input).reduce(polymerReactingReducer, '')
}

export const getFullyReactedPolymerSize = (input: string):number => {
    return polymerAfterReactions(input).length
}