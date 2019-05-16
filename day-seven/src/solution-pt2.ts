const worksGenerator = function*(works: string[], workers: number): Iterable<any> {
  const FIRST_LETTER_CODE = 65;
  let currentSecond = 0;
  let availableWorks = works;
  let workersState = Array(workers)
    .fill(null)
    .reduce((acc, _, idx) => {
      return { ...acc, [`worker-${idx + 1}`]: null };
    }, {});
  let currentWorks = {};

  while (availableWorks.length) {
    const availableWorkers: string[] = Object.entries(workersState)
      .filter(([_, value]) => value === null)
      .map(([key, _]) => key)
      .sort((a, b) => +a.split('-')[1] - +b.split('-')[1]);
  }
};

interface Work {
  dependencies: Array<string>;
  completingTime: number;
  done: boolean;
}

interface Task {
  value: Work;
  workerId: number;
  startedAt: number;
  estimatedTime: number;
}

interface Worker {
  currentTask: Task | null;
  busy: boolean;
}

export class Schedule {
  works: Map<string, Work>;
  workers: Map<number, Worker>;

  constructor(data: string[][], workersQuantity: number) {
    this.works = this._populateWorks(data);
    this.workers = this._populateWorkers(workersQuantity);
  }

  private _getEstimatedTime(letter: string): number {
    const FIRST_LETTER_CODE = 65;
    return 60 + (letter.charCodeAt(0) - FIRST_LETTER_CODE + 1);
  }

  private _populateWorks(data: string[][]): Map<string, Work> {
    const works = new Map();

    data.forEach(([dependency, work]) => {
      let createdStep = works.get(work);
      let createdDependency = works.get(dependency);

      if (!createdStep) {
        works.set(work, { dependencies: [], completingTime: this._getEstimatedTime(work), done: false });
        createdStep = works.get(work);
      }

      if (!createdDependency) {
        works.set(dependency, { dependencies: [], completingTime: this._getEstimatedTime(dependency), done: false });
        createdDependency = works.get(dependency);
      }

      createdStep.dependencies.push(dependency);
    });

    return works;
  }

  private _populateWorkers(q: number): Map<number, Worker> {
    const workers = new Map();

    Array.from({ length: q }, (_, idx) => idx + 1).forEach(id => {
      workers.set(id, {
        currentTask: null,
        busy: false
      });
    });

    return workers;
  }

  getWorks(): Map<string, Work> {
    return this.works;
  }

  getAvailableWorks(): string[] {
    const worksDone: string[] = Array.from(this.works)
      .filter(([_, info]) => info.done)
      .map(([key, _]) => key);
    const dependenciesMet = (dependencies: string[]): boolean => {
      return dependencies.filter((dep: string) => worksDone.includes(dep)).length === dependencies.length;
    };

    return Array.from(this.works)
      .filter(([_, info]) => !info.done && dependenciesMet(info.dependencies))
      .map(([key, _]) => key)
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
  }

  getAvailableWorkers(): number[] {
    return Array.from(this.workers)
      .filter(([_, info]) => !info.busy)
      .map(([id, _]) => id)
      .sort((a, b) => a - b);
  }

  private _createTask(work: Work, workerId: number, currentTime: number): Task {
    return {
      value: { ...work },
      workerId,
      startedAt: currentTime,
      estimatedTime: work.completingTime
    };
  }

  private _completeWork(s: string): void {
    const work = this.works.get(s);

    if (work) {
      this.works.set(s, { ...work, done: true });
    }
  }

  appointTask(s: string, workerId: number, currentTime: number) {
    const worker = this.workers.get(workerId);
    const work = this.works.get(s);

    if (worker && work) {
      const task = this._createTask(work, workerId, currentTime);
      this.workers.set(workerId, {
        currentTask: task,
        busy: true
      });
      this._completeWork(s);
    } else if (!worker) {
      throw new Error(`worker with id ${workerId} not found`);
    } else if (!work) {
      throw new Error(`work ${s} not found`);
    } else {
      throw new Error('unexpected error');
    }
  }

  // traverseSchedule() {
  //   let currentSecond = 0;

  //   while (works.size > 0) {
  //     let availableWorkers = this.getAvailableWorkers();
  //     let availableWorks: string[] = this.getAvailableWorks();

  //     while (availableWorks.length) {}
  //   }
  // }
}
