"use client";
import { formatText } from "@/utils/text";
import { ConfirmModal } from "./ConfirmModal";
import { X } from "lucide-react";
import { useState } from "react";

export function AppointmentCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article
        data-radix
        className="py-8 px-6 relative aspect-[342/274] rounded-md border border-input backdrop-blur-xl overflow-hidden group/card after:block after:w-[1.125rem] after:h-[1.125rem] after:rounded-full after:bg-app-primary after:absolute after:top-6 after:right-[1.125rem] after:shadow-app-shadow-inner"
      >
        <data
          value=""
          className="block font-poppins font-semibold text-app-heading-primary text-xl mb-[1.125rem]"
        >
          12/05/2024 - 14:30
        </data>
        <p className="font-poppins font-medium text-app-text-blue-gray text-base leading-[1.875rem]">
          {formatText(
            `Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.`,
            30
          )}
        </p>
        <button className="w-[5.375rem] h-[3.125rem] bg-red-500 absolute right-[-3.75rem] bottom-[-2.625rem] rotate-[-46deg] inline-flex justify-center transition-all duration-200 hover:bg-red-500/90 focus:bg-red-600 group-hover/card:right-[-2.125rem] group-hover/card:bottom-[-0.9375rem]">
          <X
            className="translate-y-[0.125rem]"
            onClick={() => setOpen(!open)}
          />
        </button>
      </article>
      <ConfirmModal open={open} setOpen={setOpen} />
    </>
  );
}
