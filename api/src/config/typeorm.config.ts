import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskEntity } from '../tasks/entities/task.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.typeOrm.host,
      port: 3306,
      username: this.config.typeOrm.user,
      password: this.config.typeOrm.password,
      database: 'test_db',
      entities: [TaskEntity],
      synchronize: this.config.typeOrm.synchronize,
    };
  }
}