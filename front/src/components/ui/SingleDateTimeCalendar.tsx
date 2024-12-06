"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Calendar, CalendarProps } from "@/components/ui/Calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { UseFormSetValue } from "react-hook-form";
import { SelectSingleEventHandler } from "react-day-picker";
import { useEffect } from "react";
import { toZonedTime } from "date-fns-tz";

interface DateTimePickerProps {
  setValue?: UseFormSetValue<any>;
  formSetValueName?: string;
  calendarProps?: CalendarProps;
  initialDateValue?: Date;
  availableDates?: Array<Date>;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function SingleDateTimeCalendar({
  setValue,
  calendarProps,
  formSetValueName,
  availableDates = [],
  date,
  setDate,
}: DateTimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  useEffect(() => {
    if (setValue && date) {
      if (!verifyAvailableMinute(date.getMinutes(), date)) {
        setValue("timeCheck", false);
      } else {
        setValue("timeCheck", true);
      }
    }
  });

  const handleDateSelect: SelectSingleEventHandler = (
    newDate: Date | undefined
  ) => {
    if (newDate && !isNaN(newDate?.getDay())) {
      setDate(newDate);
      if (setValue) setValue(formSetValueName ?? "", newDate?.toISOString());
      if (setValue && !verifyAvailableMinute(newDate.getMinutes(), newDate)) {
        setValue("timeCheck", false);
      }
    }
  };

  const verifyAvailableHour = (
    hour: number,
    internalDate: Date | undefined
  ) => {
    if (internalDate) {
      if (availableDates.length > 0) {
        const similarDayDates = availableDates.filter((availableDate) => {
          return (
            availableDate.getFullYear() === internalDate.getFullYear() &&
            availableDate.getMonth() === internalDate.getMonth() &&
            availableDate.getDate() === internalDate.getDate()
          );
        });

        return similarDayDates.some(
          (availableDate) => availableDate.getHours() === hour
        );
      }

      return false;
    } else {
      return false;
    }
  };

  const verifyAvailableMinute = (
    minute: number,
    internalDate: Date | undefined
  ) => {
    if (internalDate) {
      if (availableDates.length > 0) {
        const similarDayTimeDates = availableDates.filter((availableDate) => {
          return (
            availableDate.getFullYear() === internalDate.getFullYear() &&
            availableDate.getMonth() === internalDate.getMonth() &&
            availableDate.getDate() === internalDate.getDate() &&
            availableDate.getHours() === internalDate.getHours()
          );
        });

        return similarDayTimeDates.some(
          (availableDate) => availableDate.getMinutes() === minute
        );
      }

      return false;
    }

    return false;
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: number
  ) => {
    if (date) {
      const newDate = toZonedTime(date, "America/Sao_Paulo");
      if (type === "hour") {
        newDate.setHours(value);
        if (setValue) {
          if (!verifyAvailableMinute(newDate.getMinutes(), newDate)) {
            setValue("timeCheck", false);
          } else {
            setValue("timeCheck", true);
          }
        }
      } else if (type === "minute") {
        newDate.setMinutes(value);
        if (setValue) setValue("timeCheck", true);
      }

      if (setValue && newDate?.getDay()) {
        setValue(formSetValueName ?? "", newDate?.toISOString());
      }

      setDate(newDate);
    }
  };

  return (
    <div className="sm:flex">
      <Calendar
        className="rounded-md border"
        {...calendarProps}
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
      />
      <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex sm:flex-col p-2">
            {hours.reverse().map((hour) => (
              <Button
                key={hour}
                size="icon"
                variant={
                  date &&
                  verifyAvailableHour(hour, date) &&
                  date.getHours() === hour
                    ? "default"
                    : "ghost"
                }
                className="sm:w-full shrink-0 aspect-square"
                onClick={() => handleTimeChange("hour", hour)}
                disabled={!verifyAvailableHour(hour, date)}
              >
                {`${hour < 10 ? "0" : ""}${hour}`}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>
        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex sm:flex-col p-2">
            {minutes.map((minute) => (
              <Button
                key={minute}
                size="icon"
                variant={
                  date &&
                  verifyAvailableMinute(minute, date) &&
                  date.getMinutes() === minute
                    ? "default"
                    : "ghost"
                }
                className="sm:w-full shrink-0 aspect-square"
                onClick={() => handleTimeChange("minute", minute)}
                disabled={!verifyAvailableMinute(minute, date)}
              >
                {`${minute < 10 ? "0" : ""}${minute}`}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>
      </div>
    </div>
  );
}
