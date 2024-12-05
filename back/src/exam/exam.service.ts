import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/db/entities/exam.entity';
import { Repository } from 'typeorm';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
  ) {}

  async findAll(): Promise<ExamEntity[]> {
    return this.examRepository.find({
      relations: ['schedules'],
    });
  }

  async findOne(id: string): Promise<ExamEntity> {
    const exam = await this.examRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });

    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id} not found.`);
    }

    return exam;
  }

  async removeAvailableDate(
    examId: string,
    dateToRemove: string,
  ): Promise<void> {
    const exam = await this.examRepository.findOne({ where: { id: examId } });

    if (!exam) {
      throw new NotFoundException(`Exam with ID ${examId} not found.`);
    }

    const newDateToRemove = toZonedTime(dateToRemove, 'America/Sao_Paulo');

    if (isNaN(newDateToRemove.getDay())) {
      throw new BadRequestException('Invalid ISO date format.');
    }

    const filteredDates = exam.availableDates.filter((availableDate) => {
      const newAvailableDate = toZonedTime(availableDate, 'America/Sao_Paulo');

      return (
        `${newAvailableDate.getDay()}-${newAvailableDate.getHours()}-${newAvailableDate.getMinutes()}` !==
        `${newDateToRemove.getDay()}-${newDateToRemove.getHours()}-${newDateToRemove.getMinutes()}`
      );
    });

    if (filteredDates.length === exam.availableDates.length) {
      throw new BadRequestException(
        `The date ${dateToRemove} is not available`,
      );
    }

    exam.availableDates = filteredDates;

    await this.examRepository.save(exam);
  }

  async addAvailableDate(examId: string, dateToAdd: string): Promise<void> {
    const exam = await this.examRepository.findOne({ where: { id: examId } });

    if (!exam) {
      throw new NotFoundException(`Exam with ID ${examId} not found.`);
    }

    const dateObj = new Date(dateToAdd);

    if (isNaN(dateObj.getTime())) {
      throw new BadRequestException('Invalid ISO date format.');
    }

    const dateAlreadyExists = exam.availableDates.some(
      (availableDate) => availableDate.getTime() === dateObj.getTime(),
    );

    const currentDate = new Date();

    const differenceInHours =
      (dateObj.getTime() - currentDate.getTime()) / (1000 * 3600);

    if (dateAlreadyExists || differenceInHours < 5) {
      return;
    }

    exam.availableDates.push(dateObj);

    await this.examRepository.save(exam);
  }
}
