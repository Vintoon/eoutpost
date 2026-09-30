"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn(
        "mb-14 flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
            light
              ? "bg-white/15 text-outpost-light"
              : "bg-outpost-sky/10 text-outpost-blue"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold sm:text-4xl md:text-5xl",
          light ? "text-white" : "text-outpost-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base sm:text-lg",
            light ? "text-white/80" : "text-outpost-navy/70"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
