import { Test, TestingModule } from '@nestjs/testing';
import { BindingSamplesController } from './binding-samples.controller';
import { Logger } from '../logger/logger.service';

describe('BindingSampleController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [BindingSamplesController],
      providers: [Logger],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const sut = app.get<BindingSamplesController>(BindingSamplesController);
      expect(sut.root()).toMatchObject({message: 'Hello world!'});
    });
  });

});
