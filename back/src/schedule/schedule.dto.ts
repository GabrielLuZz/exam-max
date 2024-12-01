import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsOptional()
  id: string;
  @IsNotEmpty()
  @IsDateString()
  scheduledDate: string; // Data e hora do agendamento

  @IsNotEmpty()
  @IsString()
  information: string; // Informações adicionais sobre o agendamento

  @IsNotEmpty()
  @IsString()
  examId: string; // ID do exame associado ao agendamento
}
