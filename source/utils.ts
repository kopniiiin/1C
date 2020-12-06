import {TaskStatus, Task, SortType, GroupType} from './types';

export class TaskConstructor implements Task {
  id: string;
  name: string;
  status: TaskStatus;
  customer: string;
  performer: string;
  final: Date;

  constructor(
      id: string,
      name: string,
      status: TaskStatus,
      customer: string,
      performer: string,
      final: Date,
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.customer = customer;
    this.performer = performer;
    this.final = final;
  }
}

export const sortToHighKey = <O, K extends keyof O>(
  objects: O[],
  key: K,
): O[] => [...objects].sort(({[key]: a}, {[key]: b}) => a < b ? -1 : 1);

export const sortToLowKey = <O, K extends keyof O>(
  objects: O[],
  key: K,
): O[] => [...objects].sort(({[key]: a}, {[key]: b}) => a > b ? -1 : 1);

export const groupByKey = <O, K extends keyof O>(
  objects: O[],
  key: K,
): {[group: string]: O[]} => {
  return objects.reduce((groupedObjects: {[group: string]: O[]}, object) => {
    const group = String(object[key]);
    if (!groupedObjects[group]) groupedObjects[group] = [];
    groupedObjects[group].push(object);
    return groupedObjects;
  }, {});
};

export const sortTasksByStatuses = (
    tasks: Task[],
    statuses: TaskStatus[],
): Task[] => statuses.reduce((sortedTasks: Task[], requiredStatus) => [
  ...sortedTasks,
  ...tasks.filter(({status}) => status === requiredStatus),
], []);

export const sortTasks = (tasks: Task[], sortType: SortType): Task[] => {
  switch (sortType) {
    case SortType.DEFAULT:
      return tasks;
    case SortType.TO_HIGH_ID:
      return sortToHighKey(tasks, 'id');
    case SortType.TO_LOW_ID:
      return sortToLowKey(tasks, 'id');
    case SortType.TO_HIGH_NAME:
      return sortToHighKey(tasks, 'name');
    case SortType.TO_LOW_NAME:
      return sortToLowKey(tasks, 'name');
    case SortType.TO_HIGH_CUSTOMER:
      return sortToHighKey(tasks, 'customer');
    case SortType.TO_LOW_CUSTOMER:
      return sortToLowKey(tasks, 'customer');
    case SortType.TO_HIGH_PERFORMER:
      return sortToHighKey(tasks, 'performer');
    case SortType.TO_LOW_PERFORMER:
      return sortToLowKey(tasks, 'performer');
    case SortType.TO_HIGH_FINAL:
      return sortToHighKey(tasks, 'final');
    case SortType.TO_LOW_FINAL:
      return sortToLowKey(tasks, 'final');
    case SortType.TO_HIGH_STATUS:
      return sortTasksByStatuses(tasks, [
        TaskStatus.COMPLETED,
        TaskStatus.IN_PROGRESS,
        TaskStatus.ON_APPROVAL,
      ]);
    case SortType.TO_LOW_STATUS:
      return sortTasksByStatuses(tasks, [
        TaskStatus.ON_APPROVAL,
        TaskStatus.IN_PROGRESS,
        TaskStatus.COMPLETED,
      ]);
    default:
      return tasks;
  }
};

export const groupTasks = (
    tasks: Task[],
    groupType: GroupType,
): {[group: string]: Task[]} => {
  switch (groupType) {
    case GroupType.DEFAULT:
      return {group: tasks};
    case GroupType.STATUS:
      return groupByKey(tasks, 'status');
    case GroupType.CUSTOMER:
      return groupByKey(tasks, 'customer');
    case GroupType.PERFORMER:
      return groupByKey(tasks, 'performer');
    default:
      return {group: tasks};
  }
};
