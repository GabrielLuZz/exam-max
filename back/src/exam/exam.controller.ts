import { Controller, Get } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamEntity } from 'src/db/entities/exam.entity';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  async findAll(): Promise<ExamEntity[]> {
    return this.examService.findAll();
  }
}
