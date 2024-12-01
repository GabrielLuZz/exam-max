import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ScheduleEntity } from 'src/db/entities/schedule.entity';
import { CreateScheduleDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async findAll(): Promise<ScheduleEntity[]> {
    return this.scheduleService.findAllSchedules();
  }

  @Post()
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleEntity> {
    return this.scheduleService.createSchedule(createScheduleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.scheduleService.deleteSchedule(id);
  }
}
