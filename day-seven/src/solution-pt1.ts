export const parseInput = (input: string[]): string[][] => {
  const regPattern = new RegExp(/(?<!^)[A-Z]/g);
  return input
    .map(str => {
      const keys = str.match(regPattern);
      return keys === null ? '' : keys.join('');
    })
    .map(pathStr => pathStr.split(''));
};

interface Step {
  dependencies: Array<string>;
}

export class Instructions {
  private steps: Map<string, Step>;

  constructor(data: string[][]) {
    this.steps = this._createSteps(data);
  }

  private _createSteps(data: string[][]): Map<string, Step> {
    const steps = new Map();

    data.forEach(([dependency, step]) => {
      let createdStep = steps.get(step);
      let createdDependency = steps.get(dependency);

      if (!createdStep) {
        steps.set(step, { dependencies: [] });
        createdStep = steps.get(step);
      }

      if (!createdDependency) {
        steps.set(dependency, { dependencies: [] });
        createdDependency = steps.get(dependency);
      }

      createdStep.dependencies.push(dependency);
    });

    return steps;
  }

  getStep(value: string): Step | null {
    return this.steps.get(value) || null;
  }

  private _getAlphabeticallyFirst(steps: string[]): string {
    const sortFn = (a: string, b: string) => a.charCodeAt(0) - b.charCodeAt(0);
    return steps.sort(sortFn)[0];
  }

  private _deleteDependency(value: string, store: Map<string, Step>): void {
    Array.from(store)
      .filter(([_, info]) => {
        return info.dependencies.includes(value);
      })
      .forEach(([_, info]) => {
        const newDependencies = info.dependencies;
        newDependencies.splice(newDependencies.indexOf(value), 1);
        info.dependencies = [...newDependencies];
      });
  }

  toString() {
    let result = '';
    const steps = this.steps;

    while (steps.size > 0) {
      const availableSteps = Array.from(steps)
        .filter(([_, info]) => {
          return info.dependencies.length === 0;
        })
        .map(([value, _]) => value);

      const currentStep = this._getAlphabeticallyFirst(availableSteps);

      result += currentStep;
      steps.delete(currentStep);

      this._deleteDependency(currentStep, steps);
    }

    return result;
  }
}
