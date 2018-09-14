import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { v4 as uuidV4 } from 'uuid';
import { Logger } from '../logger/logger.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<Task[]> {
    const entities = await this.tasksRepository.find();
    return entities as Task[];
  }

  async findById(id: string): Promise<Task | null> {
    const entity = await this.tasksRepository.findOne({ id });
    return entity as Task;
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const id = uuidV4();
    const entity = {...dto, id} as TaskEntity;
    await this.tasksRepository.insert(entity);
    return entity;
  }

  async update(dto: UpdateTaskDto): Promise<Task> {
    const entity = dto as TaskEntity;
    await this.tasksRepository.update(entity.id, entity);
    return entity;
  }

  async destroy(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
