import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { Logger } from '../logger/logger.service';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

describe('TasksController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [Logger, TasksService],
    }).compile();
  });

  describe('#index', () => {
    it('should return 2 tasks', async () => {
      const sut = app.get<TasksController>(TasksController);
      const actual = await sut.index();
      expect(actual.tasks).toHaveLength(2);
    });
  });

  describe('#create', () => {
    it('should return a task having an id', async () => {
      const sut = app.get<TasksController>(TasksController);
      const param = {
        overview: 'Learn TypeScript',
        priority: 1,
        deadLine: new Date('2018-09-10T08:55:28.087Z'),
      } as CreateTaskDto;
      const actual = await sut.create(param);
      expect(actual.task.id).toBeDefined();
    });
  });

  describe('#update', () => {
    it('should return a task updated', async () => {
      const sut = app.get<TasksController>(TasksController);
      const param = {
        id: '6a414c88-4613-486d-9990-80c1de52eea4',
        overview: 'Learn TypeScript',
        priority: 1,
        deadLine: new Date('2018-10-10T08:55:28.087Z'),
      } as UpdateTaskDto;
      const actual = await sut.update(param);
      expect(actual.deadLine).toBe(param.deadLine);
    });

    it('should throw exception when a task is not found', async () => {
      const sut = app.get<TasksController>(TasksController);
      const param = {
        id: 'not-exist',
        overview: 'Learn TypeScript',
        priority: 1,
        deadLine: new Date('2018-10-10T08:55:28.087Z'),
      } as UpdateTaskDto;

      await sut.update(param).catch(error => {
        expect(error.stack).toContain('Task not found.');
      });
    });
  });

  describe('#destroy', () => {
    it('should delete a task', async () => {
      const sut = app.get<TasksController>(TasksController);
      const targetId = '6a414c88-4613-486d-9990-80c1de52eea4';
      const beforeSize = (await sut.index()).tasks.length;
      await sut.destroy(targetId);

      const afterSize = (await sut.index()).tasks.length;
      expect(beforeSize).toBe(afterSize + 1);
    });
  });
});
