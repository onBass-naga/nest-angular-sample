import { Module } from '@nestjs/common';
import { BindingSamplesController } from './binding-samples.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [BindingSamplesController],
  providers: [],
})
export class SamplesModule {}
