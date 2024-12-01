import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'exam' })
export class ExamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  specialty: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: [],
    name: 'available_dates',
  })
  availableDates: { date: string; time: string }[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.exam)
  schedules: ScheduleEntity[];
}
