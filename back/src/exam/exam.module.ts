import { Module, OnModuleInit } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ExamEntity } from 'src/db/entities/exam.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity])],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule implements OnModuleInit {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.configService.get<string>('APP_ENV') === 'development') {
      const examCount = await this.examRepository.count();

      if (examCount === 0) {
        console.log('Banco de dados vazio, populando...');

        await this.examRepository.save([
          {
            name: 'Ecocardiograma',
            specialty: 'Cardiologia',
            availableDates: [
              new Date(1764613800000).toISOString(),
              new Date(1764680400000).toISOString(),
              new Date(1764743400000).toISOString(),
              new Date(1764743400000).toISOString(),
              new Date(1764789600000).toISOString(),
            ],
          },
          {
            name: 'Raio X',
            specialty: 'Ortopedia',
            availableDates: [
              new Date(1764680400000).toISOString(),
              new Date(1764743400000).toISOString(),
            ],
          },
        ]);

        console.log('Dados de exemplo inseridos com sucesso!');
      }
    }
  }
}
