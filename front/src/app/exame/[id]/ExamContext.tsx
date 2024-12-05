"use client";

import { ExamType } from "@/utils/types";
import { toZonedTime } from "date-fns-tz";
import React, { ReactNode, createContext, useMemo, useState } from "react";

interface ExamContextInterface {
  exam: ExamType;
  setExam: React.Dispatch<React.SetStateAction<ExamType>>;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  selectedDate: Date | undefined;
}

export const ExamContext = createContext({} as ExamContextInterface);

export default function ExamProvider({
  children,
  initalExamValue,
}: {
  children: ReactNode;
  initalExamValue: ExamType;
}) {
  const [exam, setExam] = useState<ExamType>(initalExamValue);
  const selectedJsonbDate = useMemo(
    () =>
      exam?.availableDates?.sort((a, b) => {
        const dateA = toZonedTime(a, "America/Sao_Paulo");
        const dateB = toZonedTime(b, "America/Sao_Paulo");

        return dateA?.getTime() - dateB?.getTime();
      })[0],
    [exam]
  );

  const selectedDate = selectedJsonbDate
    ? toZonedTime(selectedJsonbDate, "America/Sao_Paulo")
    : undefined;

  const [date, setDate] = React.useState<Date | undefined>(selectedDate);

  return (
    <ExamContext.Provider
      value={{
        exam,
        setExam,
        date,
        setDate,
        selectedDate,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}
