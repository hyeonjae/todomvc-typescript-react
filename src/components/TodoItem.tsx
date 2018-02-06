export enum TodoStatus {
  Active = 1,
  Completed
}

export enum Filter {
  All = 0,
  Active,
  Completed
}

export default class TodoItem {
  id: number;
  contents: string;
  status: TodoStatus;

  constructor(contents: string, status: TodoStatus = TodoStatus.Active) {
    this.contents = contents;
    this.status = status;
  }
}