export class CreateTaskDto {
  readonly overview: string;
  readonly priority: number;
  readonly deadLine: Date;
}

export class UpdateTaskDto {
  readonly id: string;
  readonly overview: string;
  readonly priority: number;
  readonly deadLine: Date;
}
