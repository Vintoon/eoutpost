"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  className?: string;
  children?: ReactNode;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  className,
  children,
  hover = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -8 } : undefined}
      className={cn(
        "glass rounded-xl2 p-6 transition-shadow duration-300",
        hover && "hover:shadow-glass-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
