import { process } from 'uniqid';

enum ProgressStatus {
  done,
  inProgress,
  available,
  notAvailable
}

interface Task {
  value: string;
  dependencies: string[];
  status: ProgressStatus;
  estimatedTime: number;
  startedAt: number | null;
}

interface Worker {
  position: number;
  currentTask: string | null;
  busy: boolean;
}

interface Store<T> {
  [id: string]: T;
}

export class Schedule {
  private workers: Store<Worker> = {};
  private tasks: Store<Task> = {};
  private initialTime: number = 0;

  constructor(data: string[][], workersCount: number, initialTime?: number) {
    if (initialTime) this.initialTime = initialTime;
    this._storeTasks(data);
    this._storeWorkers(workersCount);
    this._checkTasksAvailability();
  }

  private _generateId(): string {
    return process();
  }

  private _getEstimatedTime(task: string): number {
    const FIRST_LETTER_CODE = 65;

    return this.initialTime + task.charCodeAt(0) - FIRST_LETTER_CODE + 1;
  }

  private _getTaskByValue(s: string): { id: string; task: Task } {
    const task = Object.entries(this.tasks).filter(([_, info]) => info.value === s);
    return {
      id: task[0][0],
      task: task[0][1]
    };
  }

  private _storeTasks(data: string[][]): void {
    data.forEach(([dependency, task]) => {
      const ifTaskCreated: boolean = Object.entries(this.tasks).filter(([_, info]) => info.value === task).length > 0;
      const ifDependencyCreated: boolean = Object.entries(this.tasks).filter(([_, info]) => info.value === dependency).length > 0;

      if (!ifTaskCreated) {
        this.tasks[this._generateId()] = {
          value: task,
          dependencies: [],
          status: ProgressStatus.notAvailable,
          estimatedTime: this._getEstimatedTime(task),
          startedAt: null
        };
      }

      if (!ifDependencyCreated) {
        this.tasks[this._generateId()] = {
          value: dependency,
          dependencies: [],
          status: ProgressStatus.notAvailable,
          estimatedTime: this._getEstimatedTime(dependency),
          startedAt: null
        };
      }

      const createdTask = this._getTaskByValue(task);
      const createdDependency = this._getTaskByValue(dependency);
      createdTask.task.dependencies = [...createdTask.task.dependencies, createdDependency.id];
    });
  }

  private _storeWorkers(workersCount: number): void {
    this.workers = Array.from({ length: workersCount }, (_, idx) => {
      return {
        id: this._generateId(),
        info: {
          position: idx + 1,
          currentTask: null,
          busy: false
        }
      };
    }).reduce((acc, { id, info }) => ({ ...acc, [id]: info }), {});
  }

  private _getFreeWorkerId(): string | null {
    const sortedAvailableWorkers = Object.entries(this.workers)
      .filter(([_, info]) => !info.busy)
      .sort(([_, infoA], [_2, infoB]) => infoA.position - infoB.position);
    return sortedAvailableWorkers.length ? sortedAvailableWorkers[0][0] : null;
  }

  private _getAvailableTasksId(): string[] {
    const sortedAvailableTasks = Object.entries(this.tasks)
      .filter(([_, info]) => info.status === ProgressStatus.available)
      .sort(([_a, infoA], [_b, infoB]) => infoA.value.charCodeAt(0) - infoB.value.charCodeAt(0))
      .map(([id, _]) => id);

    return sortedAvailableTasks;
  }

  private _dependenciesMet(dependenciesIds: string[]): boolean {
    return (
      dependenciesIds.filter(dependencyId => {
        return this.tasks[dependencyId].status === ProgressStatus.done;
      }).length === dependenciesIds.length
    );
  }

  private _checkTasksAvailability(): void {
    Object.entries(this.tasks).forEach(([id, info]) => {
      const { dependencies } = info;

      if (info.status === ProgressStatus.notAvailable) {
        if (dependencies.length) {
          const isAvailable = this._dependenciesMet(dependencies);
          if (isAvailable) {
            info.status = ProgressStatus.available;
          }
        } else {
          info.status = ProgressStatus.available;
        }
      }
    });
  }

  private _checkTasksProgress(currentTime: number, progress: string): string {
    let result = progress;

    const currentInProgressTasks = Object.entries(this.tasks).filter(([_, info]) => info.status === ProgressStatus.inProgress);

    for (let [currentTaskId, currentTaskInfo] of currentInProgressTasks) {
      const { startedAt, estimatedTime, value } = currentTaskInfo;

      if (startedAt === null) {
        throw new Error('something weird happened');
      } else {
        if (currentTime === startedAt + estimatedTime) {
          result += value;

          this.tasks[currentTaskId].status = ProgressStatus.done;
          const assignedWorkerId = Object.entries(this.workers).filter(([_, info]) => info.currentTask === currentTaskId)[0][0];

          this.workers[assignedWorkerId].busy = false;
          this.workers[assignedWorkerId].currentTask = null;
        }
      }
    }

    return result;
  }

  private _tasksFinished(): boolean {
    return Object.entries(this.tasks).every(([_, info]) => info.status === ProgressStatus.done);
  }

  private _assignTaskToWorker(taskId: string, workerId: string, currentTime: number): void {
    this.workers[workerId].busy = true;
    this.workers[workerId].currentTask = taskId;
    this.tasks[taskId].startedAt = currentTime;
    this.tasks[taskId].status = ProgressStatus.inProgress;
  }

  calculateCompletingTime(): { timeSpent: number; result: string } {
    let currentTime = 0;
    let result = '';

    while (true) {
      //todo get available task
      const availableTasksId: string[] = this._getAvailableTasksId();

      for (let availableTaskId of availableTasksId) {
        //todo get available worker
        const availableWorkerId = this._getFreeWorkerId();

        if (availableWorkerId) {
          this._assignTaskToWorker(availableTaskId, availableWorkerId, currentTime);
        }
      }

      currentTime++;

      if (this._tasksFinished()) {
        break;
      }

      result = this._checkTasksProgress(currentTime, result);
      this._checkTasksAvailability();
    }

    return {
      timeSpent: currentTime - 1,
      result
    };
  }
}
