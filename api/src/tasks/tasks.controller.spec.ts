import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { Logger } from '../logger/logger.service';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';

describe('TasksController', () => {
  let app: TestingModule;

  beforeAll(async () => {

    const tasks = [
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

    const MockRepository = {
      provide: getRepositoryToken(TaskEntity),
      useValue: {
        find: () => tasks,
        insert: entity => tasks.push(entity),
        update: (id, entity) => entity,
        delete: () => tasks.splice(0, 1),
      },
    };

    app = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [Logger, TasksService, MockRepository],
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
        deadline: new Date('2018-09-10T08:55:28.087Z'),
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
        deadline: new Date('2018-10-10T08:55:28.087Z'),
      } as UpdateTaskDto;
      const actual = await sut.update(param);
      expect(actual.deadline).toBe(param.deadline);
    });

    it('should throw exception when a task is not found', async () => {
      const sut = app.get<TasksController>(TasksController);
      const param = {
        id: 'not-exist',
        overview: 'Learn TypeScript',
        priority: 1,
        deadline: new Date('2018-10-10T08:55:28.087Z'),
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
