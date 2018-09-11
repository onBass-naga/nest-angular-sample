import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { LoggerModule } from './logger/logger.module';
import { SamplesModule } from './samples/samples.module';

@Module({
  imports: [
    LoggerModule,
    TasksModule,
    SamplesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
