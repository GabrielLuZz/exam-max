export interface ExamType {
  id: string;
  name: string;
  specialty: string;
  availableDates: { date: string; time: string }[];
  schedules: ScheduleType[];
}

export interface ScheduleType {}
