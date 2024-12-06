"use client";
import { AnimatePresence } from "motion/react";
import { ReactNode } from "react";
import { motion } from "motion/react";
export function TemplateClient({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div className="relative flex flex-col min-h-screen overflow-hidden">
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
