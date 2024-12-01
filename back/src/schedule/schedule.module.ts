import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from 'src/db/entities/schedule.entity';
import { ExamEntity } from 'src/db/entities/exam.entity';
import { ExamService } from 'src/exam/exam.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity, ExamEntity])],
  controllers: [ScheduleController],
  providers: [ScheduleService, ExamService],
})
export class ScheduleModule {}
