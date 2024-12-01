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

      // Verifica se não existem exames cadastrados
      if (examCount === 0) {
        console.log('Banco de dados vazio, populando...');

        // Populando com exames de exemplo
        await this.examRepository.save([
          {
            name: 'Ecocardiograma',
            specialty: 'Cardiologia',
            availableDates: [
              { date: '2024-12-01', time: '15:30' },
              { date: '2024-12-02', time: '10:00' },
            ],
          },
          {
            name: 'Raio X',
            specialty: 'Ortopedia',
            availableDates: [
              { date: '2024-12-03', time: '14:00' },
              { date: '2024-12-04', time: '09:30' },
            ],
          },
        ]);

        console.log('Dados de exemplo inseridos com sucesso!');
      }
    }
  }
}
