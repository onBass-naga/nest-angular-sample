import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
