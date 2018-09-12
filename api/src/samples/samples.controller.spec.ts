import { Test, TestingModule } from '@nestjs/testing';
import { SamplesController } from './samples.controller';
import { Logger } from '../logger/logger.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SamplesController],
      providers: [Logger],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const sut = app.get<SamplesController>(SamplesController);
      expect(sut.root()).toMatchObject({message: 'Hello world!'});
    });
  });

});
