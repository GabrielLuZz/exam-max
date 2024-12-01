import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ExamModule } from './exam/exam.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [__dirname + '/../../.env', __dirname + '/../.env'],
    }),
    DbModule,
    ExamModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
