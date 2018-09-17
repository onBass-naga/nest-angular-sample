import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export interface OrmEnv {
  host: string;
  port: number;
  user: string;
  password: string;
  synchronize: boolean;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    const merged = Object.assign({}, config, process.env);
    this.envConfig = this.validateInput(merged);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      ENV_NAME: Joi.string()
        .valid(['dev', 'prod', 'test'])
        .default('dev'),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_PORT: Joi.number().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      TYPEORM_SYNCHRONIZE: Joi.boolean(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
      { stripUnknown: true },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get typeOrm(): OrmEnv {
    return {
      host: this.envConfig.DATABASE_HOST,
      user: this.envConfig.DATABASE_USER,
      port: parseInt(this.envConfig.DATABASE_PORT, 10),
      password: this.envConfig.DATABASE_PASSWORD,
      synchronize: Boolean(this.envConfig.TYPEORM_SYNCHRONIZE),
    };
  }
}
