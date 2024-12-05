"use client";
import { formatText } from "@/utils/text";
import { ConfirmModal } from "./ConfirmModal";
import { X } from "lucide-react";
import { MouseEvent, useContext, useState } from "react";
import { ScheduleType } from "@/utils/types";
import { format, setDate } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { baseUrlForClient } from "@/services/back";
import { toast } from "react-toastify";
import { ExamContext } from "./ExamContext";

interface AppointmentCardProps {
  schedule: ScheduleType;
}

export function AppointmentCard({ schedule }: AppointmentCardProps) {
  const [open, setOpen] = useState(false);
  const { setExam, setDate, exam } = useContext(ExamContext);
  const [loading, setLoading] = useState(false);

  const formattedDate = format(
    toZonedTime(schedule.scheduledDate, "America/Sao_Paulo"),
    "dd/MM/yyyy - HH:mm"
  );

  const handleContinue = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const headers = new Headers();

    const deleteScheduleOptions = {
      method: "DELETE",
      headers: headers,
    };

    setLoading(true);
    const scheduleResponse = await fetch(
      `${baseUrlForClient}/schedule/${schedule.id}`,
      deleteScheduleOptions
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(
          "Erro durante a requisição para deletar um schedule:",
          error
        );
      });

    setLoading(false);
    if (scheduleResponse?.error && scheduleResponse?.statusCode === 404) {
      toast.error(`${scheduleResponse.message}`, {
        position: "bottom-right",
      });
    } else {
      toast.success("Agendamento cancelado!", {
        position: "bottom-right",
      });

      setExam((prev) => scheduleResponse);

      setDate((prev) => {
        const canceledSchedule = exam.schedules.find(
          (oldSchedule) => oldSchedule.id === schedule.id
        );

        if (canceledSchedule) {
          const firstDate = canceledSchedule.scheduledDate;

          return toZonedTime(firstDate, "America/Sao_Paulo");
        }

        return prev;
      });

      setOpen(false);
    }
  };

  return (
    <>
      <article
        data-radix
        className="py-8 px-6 relative aspect-[342/274] rounded-md border border-input backdrop-blur-xl overflow-hidden group/card after:block after:w-[1.125rem] after:h-[1.125rem] after:rounded-full after:bg-app-primary after:absolute after:top-6 after:right-[1.125rem] after:shadow-app-shadow-inner"
      >
        <data
          value={schedule.scheduledDate}
          className="block font-poppins font-semibold text-app-heading-primary text-xl mb-[1.125rem]"
        >
          {formattedDate}
        </data>
        <p className="font-poppins font-medium text-app-text-blue-gray text-base leading-[1.875rem]">
          {formatText(schedule.information, 30)}
        </p>
        <button className="w-[5.375rem] h-[3.125rem] bg-red-500 absolute right-[-3.75rem] bottom-[-2.625rem] rotate-[-46deg] inline-flex justify-center transition-all duration-200 hover:bg-red-500/90 focus:bg-red-600 group-hover/card:right-[-2.125rem] group-hover/card:bottom-[-0.9375rem]">
          <X
            className="translate-y-[0.125rem]"
            onClick={() => setOpen(!open)}
          />
        </button>
      </article>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        handleContinue={handleContinue}
        loading={loading}
      />
    </>
  );
}
