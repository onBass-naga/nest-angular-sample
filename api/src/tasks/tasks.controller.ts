import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  Controller,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Logger } from '../logger/logger.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async index() {
    const tasks = await this.tasksService.findAll();
    return { tasks };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body('task') dto: CreateTaskDto) {
    this.logger.debug('create: ' + JSON.stringify(dto));

    const created = await this.tasksService.create(dto);
    return { task: created };
  }

  @Put()
  async update(@Body('task') dto: UpdateTaskDto) {
    this.logger.debug('update: ' + JSON.stringify(dto));

    return await this.tasksService.update(dto).catch(error => {
      throw new HttpException(
        `Task not found. [id: ${dto.id}]`,
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    this.logger.debug('delete: ' + JSON.stringify(id));

    await this.tasksService.destroy(id);
    return;
  }
}
