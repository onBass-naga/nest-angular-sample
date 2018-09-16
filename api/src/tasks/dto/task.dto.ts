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
  readonly deadline: Date;
}

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
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
  readonly deadline: Date;
}
