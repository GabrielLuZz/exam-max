import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/db/entities/exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
  ) {}

  // Método para pegar todos os exames
  async findAll(): Promise<ExamEntity[]> {
    return this.examRepository.find({
      relations: ['schedules'],
    });
  }

  async removeAvailableDate(
    examId: string,
    dateToRemove: string,
  ): Promise<void> {
    const exam = await this.examRepository.findOne({ where: { id: examId } });

    if (!exam) {
      throw new NotFoundException(`Exam with ID ${examId} not found.`);
    }

    const dateObj = new Date(dateToRemove);

    if (isNaN(dateObj.getTime())) {
      throw new BadRequestException('Invalid ISO date format.');
    }

    const date = dateObj.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const time = dateObj.toISOString().split('T')[1].slice(0, 5); // "HH:mm"

    const initialLength = exam.availableDates.length;
    exam.availableDates = exam.availableDates.filter(
      (availableDate) =>
        availableDate.date !== date && availableDate.time !== time,
    );

    // Se nenhuma data foi removida, lança um erro
    if (exam.availableDates.length === initialLength) {
      throw new BadRequestException({
        message: 'Date not found in available dates of the exam',
        statusCode: 400,
        error: 'Bad Request',
      });
    }

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

    const date = dateObj.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const time = dateObj.toISOString().split('T')[1].slice(0, 5); // "HH:mm"

    const dateAlreadyExists = exam.availableDates.some(
      (availableDate) =>
        availableDate.date === date && availableDate.time === time,
    );

    const currentDate = new Date();

    const differenceInHours =
      (dateObj.getTime() - currentDate.getTime()) / (1000 * 3600);

    if (dateAlreadyExists || differenceInHours < 5) {
      return;
    }

    exam.availableDates.push({ date, time });

    await this.examRepository.save(exam);
  }
}
