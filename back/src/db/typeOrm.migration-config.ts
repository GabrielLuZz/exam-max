import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ExamEntity } from './entities/exam.entity';
import { ScheduleEntity } from './entities/schedule.entity';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: Number(configService.get<number>('DB_PORT')),
  database: configService.get<string>('DB_DATABASE'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  synchronize: configService.get<string>('APP_ENV') !== 'production',
  entities: [ExamEntity, ScheduleEntity],
  migrations: [__dirname + '/migrations/*.ts'],
  extra: {
    timezone: 'America/Sao_Paulo',
  },
};

export default new DataSource(dataSourceOptions);
