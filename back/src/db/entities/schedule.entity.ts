import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamEntity } from './exam.entity';

@Entity({ name: 'schedule' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: true, name: 'schedule_date' })
  scheduledDate: Date;

  @Column({ type: 'text' })
  information: string;

  @ManyToOne(() => ExamEntity, (exam) => exam.schedules)
  exam: ExamEntity;
}
