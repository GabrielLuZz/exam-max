"use client";

import { AppointmentCard } from "./AppointmentCard";
import { useContext } from "react";
import { ExamContext } from "./ExamContext";

export function SchedulesList() {
  const { exam } = useContext(ExamContext);

  return (
    <div
      className="responsive-grid mb-8"
      style={{
        gap: "clamp(1.6rem, 3.625cqi, 3.625rem)",
        marginBottom: "clamp(1rem ,1.875cqi, 1.875rem)",
      }}
    >
      {exam?.schedules?.map((schedule) => (
        <AppointmentCard key={schedule.id} schedule={schedule} />
      ))}
    </div>
  );
}
