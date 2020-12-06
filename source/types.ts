export enum TaskStatus {
  ON_APPROVAL = 'На утверждении',
  IN_PROGRESS = 'В процессе',
  COMPLETED = 'Выполнена',
}

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  customer: string;
  performer: string;
  final: Date;
}

export enum SortType {
  DEFAULT = 'default',
  TO_HIGH_ID = 'toHighID',
  TO_LOW_ID = 'toLowID',
  TO_HIGH_NAME = 'toHighName',
  TO_LOW_NAME = 'toLowName',
  TO_HIGH_STATUS = 'toHighStatus',
  TO_LOW_STATUS = 'toLowStatus',
  TO_HIGH_CUSTOMER = 'toHighCustomer',
  TO_LOW_CUSTOMER = 'toLowCustomer',
  TO_HIGH_PERFORMER = 'toHighPerformer',
  TO_LOW_PERFORMER = 'toLowPerformer',
  TO_HIGH_FINAL = 'toHighFinal',
  TO_LOW_FINAL = 'toLowFinal',
}

export enum GroupType {
  DEFAULT = 'default',
  STATUS = 'status',
  CUSTOMER = 'customer',
  PERFORMER = 'performer',
}

export interface TaskGroup {
  name: string;
  tasks: Task[];
}
