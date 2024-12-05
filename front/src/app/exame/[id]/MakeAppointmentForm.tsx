"use client";

import {
  Button,
  SingleDateTimeCalendar,
  Label,
  Textarea,
} from "@/components/ui";
import { ScheduleType } from "@/utils/types";
import { ChevronRight, Loader2 } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { baseUrlForClient } from "@/services/back";
import { ExamContext } from "./ExamContext";
import { toZonedTime } from "date-fns-tz";

const FormValidationSchema = zod.object({
  scheduledDate: zod
    .string({ message: "Por favor, marque a data e horário da consulta" })
    .refine((value) => value.trim() !== "", {
      message: "Por favor, marque a data e horário da consulta",
    }),
  timeCheck: zod
    .boolean({ message: "Por favor, marque a data e horário da consulta" })
    .refine((value) => value === true, {
      message: "Por favor, marque a data e horário da consulta",
    }),
  information: zod
    .string({ message: "Por favor, nos dê mais detalhes sobre a consulta" })
    .refine((value) => value.trim() !== "", {
      message: "Por favor, nos dê mais detalhes sobre a consulta",
    }),
});

type IFormData = zod.infer<typeof FormValidationSchema>;

export function MakeAppointmentForm() {
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    trigger,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(FormValidationSchema),
  });

  const { exam, setExam, date, setDate, selectedDate } =
    useContext(ExamContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate && !isNaN(selectedDate?.getDay())) {
      setValue("scheduledDate", selectedDate?.toISOString());
    }
  }, []);

  useEffect(() => {
    Object.entries(errors).map(([field, error]) => {
      if (error.message)
        toast.warning(error.message, {
          position: "bottom-right",
        });
    });
  }, [errors]);

  const handleOnSubmit: SubmitHandler<
    IFormData & { [key: string]: any }
  > = async (data) => {
    if (data.timeCheck) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const scheduleOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ examId: exam.id, ...data }),
      };

      const scheduleResponse = await fetch(`${baseUrlForClient}/schedule`, {
        cache: "no-cache",
        ...scheduleOptions,
      })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error(
            "Erro durante a requisição para criar um agendamento:",
            error
          );
        });

      if (scheduleResponse.error) {
        toast.error(`${scheduleResponse.message}`, {
          position: "bottom-right",
        });
      } else {
        let schedule: ScheduleType = scheduleResponse;

        resetField("information");
        schedule.exam.availableDates.sort((a, b) => {
          const dateA = toZonedTime(a, "America/Sao_Paulo");
          const dateB = toZonedTime(b, "America/Sao_Paulo");

          return dateA?.getTime() - dateB?.getTime();
        });

        setExam(schedule.exam);

        if (schedule?.exam?.availableDates?.length > 0) {
          setDate(
            toZonedTime(
              schedule?.exam?.availableDates?.[0],
              "America/Sao_Paulo"
            )
          );

          setValue(
            "scheduledDate",
            toZonedTime(
              schedule?.exam?.availableDates?.[0],
              "America/Sao_Paulo"
            ).toISOString()
          );
        } else {
          setDate(undefined);
        }

        toast.success(`Agendamento criado com sucesso!`, {
          position: "bottom-right",
        });
      }
    }
  };

  const handleSubmitButtonClick = async () => {
    let isValid = await trigger();

    if (isValid) {
      setLoading(true);
      await handleSubmit(handleOnSubmit)();
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center flex-wrap gap-2">
          <h2
            className="font-volkhov font-normal text-app-heading-primary"
            style={{ fontSize: "clamp(1.5rem,2cqi, 2rem)" }}
          >
            Agende uma consulta
          </h2>
          {!(exam?.availableDates?.length > 0) && (
            <span className="text-red-400">
              - Não há disponibilidade no momento
            </span>
          )}
        </div>
        {exam?.availableDates?.length > 0 && (
          <Button
            className="bg-app-heading-primary hover:bg-app-heading-primary/90"
            onClick={handleSubmitButtonClick}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            Enviar
            <ChevronRight />
          </Button>
        )}
      </div>
      <div
        className="flex flex-col items-center md:flex-row"
        style={{ gap: "clamp(1.875rem,2.625cqi, 2.625rem)" }}
      >
        <SingleDateTimeCalendar
          setValue={setValue}
          formSetValueName="scheduledDate"
          calendarProps={{
            disabled: (date) =>
              !exam?.availableDates?.some((availableDate) => {
                const allowedDate = toZonedTime(
                  availableDate,
                  "America/Sao_Paulo"
                );
                return (
                  allowedDate.getDate() === date.getDate() &&
                  allowedDate.getMonth() === date.getMonth() &&
                  allowedDate.getFullYear() === date.getFullYear()
                );
              }),
            defaultMonth: date ?? toZonedTime(new Date(), "America/Sao_Paulo"),
          }}
          availableDates={exam?.availableDates?.map((availableDate) =>
            toZonedTime(availableDate, "America/Sao_Paulo")
          )}
          date={date}
          setDate={setDate}
        />

        <div className="w-full">
          <Label
            htmlFor="message"
            className="font-volkhov font-normal text-xl text-app-heading-primary"
          >
            Observação
          </Label>
          <Textarea
            placeholder="Type your message here."
            id="message"
            className="resize-none h-[13.875rem]"
            {...register("information")}
          />
        </div>
      </div>
    </section>
  );
}
