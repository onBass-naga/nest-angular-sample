import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { LoggerModule } from './logger/logger.module';
import { SamplesModule } from './samples/samples.module';
import { TypeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeOrmConfig,
    }),
    LoggerModule,
    TasksModule,
    SamplesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
