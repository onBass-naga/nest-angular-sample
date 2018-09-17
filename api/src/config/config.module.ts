import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmConfig } from './typeorm.config';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`env/${process.env.ENV_NAME}.env`),
    },
    TypeOrmConfig,
  ],
  exports: [ConfigService, TypeOrmConfig],
})
export class ConfigModule {}