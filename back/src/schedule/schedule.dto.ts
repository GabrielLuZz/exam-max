import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsDateString()
  scheduledDate: string;

  @IsString()
  information: string;

  @IsNotEmpty()
  @IsUUID('all')
  examId: string;
}
