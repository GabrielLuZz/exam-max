export interface ExamType {
  id: string;
  name: string;
  specialty: string;
  availableDates: string[];
  schedules: ScheduleType[];
}

export interface ScheduleType {
  id: string;
  scheduledDate: string;
  information: string;
  exam: ExamType;
}

export interface NestCommonError {
  message: string;
  statusCode: number;
  error: string;
}
