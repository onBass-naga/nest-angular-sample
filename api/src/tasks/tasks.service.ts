import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { v4 as uuidV4 } from 'uuid';
import { Logger } from '../logger/logger.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly logger: Logger) {}

  private readonly tasks: Task[] = [
    {
      id: '6a414c88-4613-486d-9990-80c1de52eea4',
      overview: 'Learn TypeScript',
      priority: 1,
      deadLine: new Date('2018-09-10T08:55:28.087Z'),
    },
    {
      id: 'd8a4132e-72ec-490c-b5f5-a8bbc4509be6',
      overview: 'Learn Node.js',
      priority: 2,
      deadLine: new Date('2018-09-11T07:41:59.711Z'),
    },
  ];

  findAll(): Promise<Task[]> {
    return new Promise(resolve => {
      resolve(this.tasks);
    });
  }

  findById(id: string): Promise<Task | null> {
    return new Promise(resolve => {
      resolve(this.tasks.find(t => t.id === id));
    });
  }

  create(dto: CreateTaskDto): Promise<Task> {
    return new Promise(resolve => {
      const id = uuidV4();
      const task = { id, ...dto };
      this.tasks.push(task as Task);
      resolve(task);
    });
  }

  async update(dto: UpdateTaskDto): Promise<Task> {
    const saved = await this.findById(dto.id);
    if (saved == null) {
      throw new Error(`Task not found. [id: ${dto.id}]`);
    }

    const index = this.tasks.findIndex(t => t.id === saved.id);
    this.tasks.splice(index, 1);
    const task: Task = dto as Task;
    this.tasks.push(task);
    return task;
  }

  destroy(id: string): Promise<void> {
    return new Promise(resolve => {
      const index = this.tasks.findIndex(t => t.id === id);
      if (!!index) {
        this.tasks.splice(index, 1);
      }
      resolve();
    });
  }
}
