import { Module } from '@nestjs/common';
import { SamplesController } from './samples.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [SamplesController],
  providers: [],
})
export class SamplesModule {}
