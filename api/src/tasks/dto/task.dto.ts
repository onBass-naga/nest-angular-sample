import { IsString, IsNotEmpty, IsDefined, IsInt, IsPositive, IsUUID, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly overview: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  readonly priority: number;

  @IsString()
  @IsDefined()
  readonly deadLine: Date;
}

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID("4")
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly overview: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  readonly priority: number;

  @IsString()
  @IsDefined()
  readonly deadLine: Date;
}
