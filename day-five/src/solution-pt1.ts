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