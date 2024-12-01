import { BadRequestException, Injectable } from '@nestjs/common';
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
    return this.examRepository.find();
  }

  async removeAvailableDate(
    examId: string,
    dateToRemove: string,
  ): Promise<void> {
    // Busca o exame pelo ID
    const exam = await this.examRepository.findOne({ where: { id: examId } });

    if (!exam) {
      throw new BadRequestException('invalid exam id');
    }

    // Converte a data ISO para o formato armazenado no banco ({ date, time })
    const dateObj = new Date(dateToRemove);
    if (isNaN(dateObj.getTime())) {
      throw new BadRequestException('Invalid ISO date format.');
    }
    const date = dateObj.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const time = dateObj.toISOString().split('T')[1].slice(0, 5); // "HH:mm"

    // Filtra para remover a data correspondente
    const initialLength = exam.availableDates.length;
    exam.availableDates = exam.availableDates.filter(
      (availableDate) =>
        availableDate.date !== date && availableDate.time !== time,
    );

    // Se nenhuma data foi removida, lança um erro
    if (exam.availableDates.length === initialLength) {
      throw new BadRequestException('Date not found in availableDates');
    }

    // Atualiza o registro no banco
    await this.examRepository.save(exam);
  }

  async addAvailableDate(examId: string, dateToAdd: string): Promise<void> {
    // Busca o exame pelo ID
    const exam = await this.examRepository.findOne({ where: { id: examId } });

    if (!exam) {
      throw new BadRequestException('invalid exam id');
    }

    // Converte a data ISO para o formato armazenado no banco ({ date, time })
    const dateObj = new Date(dateToAdd);
    if (isNaN(dateObj.getTime())) {
      throw new BadRequestException('Invalid ISO date format.');
    }
    const date = dateObj.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const time = dateObj.toISOString().split('T')[1].slice(0, 5); // "HH:mm"

    // Verifica se a data já existe
    const dateAlreadyExists = exam.availableDates.some(
      (availableDate) =>
        availableDate.date === date && availableDate.time === time,
    );

    if (dateAlreadyExists) {
      return;
    }

    // Adiciona a nova data ao array
    exam.availableDates.push({ date, time });

    // Atualiza o registro no banco
    await this.examRepository.save(exam);
  }
}
