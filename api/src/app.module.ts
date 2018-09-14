import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { LoggerModule } from './logger/logger.module';
import { SamplesModule } from './samples/samples.module';
import { dbConfig } from './db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    LoggerModule,
    TasksModule,
    SamplesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
