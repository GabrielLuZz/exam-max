"use client";

import { Button, Label, Textarea } from "@/components/ui";
import { Calendar } from "@/components/ui";
import { ChevronRight } from "lucide-react";
import React from "react";

export function MakeAppointmentForm() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  console.log(date);

  return (
    <form>
      <div className="flex justify-between items-center mb-8">
        <h2
          className="font-volkhov font-normal text-app-heading-primary"
          style={{ fontSize: "clamp(1.5rem,2cqi, 2rem)" }}
        >
          Agende uma consulta
        </h2>
        <Button className="bg-app-heading-primary hover:bg-app-heading-primary/90">
          Enviar
          <ChevronRight />
        </Button>
      </div>
      <div
        className="flex flex-col items-center md:flex-row"
        style={{ gap: "clamp(1.875rem,2.625cqi, 2.625rem)" }}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
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
          />
        </div>
      </div>
    </form>
  );
}
