import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/db/entities/exam.entity';
import { ScheduleEntity } from 'src/db/entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './schedule.dto';
import { ExamService } from 'src/exam/exam.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
    private readonly examService: ExamService,
  ) {}

  async createSchedule(
    createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleEntity> {
    const { scheduledDate, information, examId } = createScheduleDto;

    const exam = await this.examRepository.findOne({ where: { id: examId } });

    if (!exam) {
      throw new NotFoundException(`Exam with ID ${examId} not found.`);
    }

    await this.examService.removeAvailableDate(examId, scheduledDate);

    const schedule = this.scheduleRepository.create({
      scheduledDate: new Date(scheduledDate),
      information,
      exam,
    });

    const scheduleSaved = await this.scheduleRepository.save(schedule);

    const updatedExam = await this.examRepository.findOne({
      where: { id: examId },
    });

    return { id: scheduleSaved.id, ...scheduleSaved, exam: updatedExam };
  }

  async findAllSchedules(): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find({
      relations: ['exam'],
    });
  }

  async deleteSchedule(id: string): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['exam'],
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found.`);
    }

    await this.examService.addAvailableDate(
      schedule.exam.id,
      schedule.scheduledDate.toISOString(),
    );

    await this.scheduleRepository.remove(schedule);
  }
}
