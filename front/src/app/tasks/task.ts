export interface Task {
  readonly id: string;
  readonly overview: string;
  readonly priority: number;
  readonly deadline: Date;
}
