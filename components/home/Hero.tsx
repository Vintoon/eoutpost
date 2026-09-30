"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, PlayCircle } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({
  title = "Preparing a People for the Soon Coming of Christ",
  subtitle = "Enoch's Outpost Ministry exists to point hearts to Jesus through faithful Bible study, health education, and family discipleship — walking with Enoch, looking unto Jesus.",
}: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-outpost-gradient pt-24">
      {/* Background imagery */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2000&auto=format&fit=crop"
          alt="Sunrise over the mountains"
          fill
          priority
          className="object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-outpost-gradient opacity-80" />
        <div className="absolute inset-0 bg-outpost-radiance" />
      </div>

      {/* Floating light rays / orbs */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 animate-float rounded-full bg-outpost-light/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-96 w-96 animate-float rounded-full bg-outpost-gold/10 blur-3xl [animation-delay:2s]" />

      <div className="section relative flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="animate-float"
        >
          <Image
            src="/logo.png"
            alt="Enoch's Outpost Ministry logo"
            width={140}
            height={140}
            className="h-28 w-28 object-contain drop-shadow-2xl sm:h-36 sm:w-36"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="max-w-4xl font-display text-4xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button href="/resources" size="lg" variant="gold">
            Explore Resources <ArrowRight size={18} />
          </Button>
          <Button href="/sermons" size="lg" variant="secondary">
            <PlayCircle size={18} /> Watch Sermons
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-white/80"
          />
        </div>
      </motion.div>
    </section>
  );
}
