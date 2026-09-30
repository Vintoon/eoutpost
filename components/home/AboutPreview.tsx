"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Compass, Eye, ScrollText } from "lucide-react";

interface AboutPreviewProps {
  mission?: string;
  vision?: string;
  history?: string;
}

export default function AboutPreview({
  mission = "To prepare hearts for Christ's return through Scripture, health, and Christ-centered community.",
  vision = "A generation rooted in the Word, walking faithfully as Enoch walked with God.",
  history = "Born from a small home Bible study in Nyeri, now reaching families across the region.",
}: AboutPreviewProps) {
  const points = [
    { icon: Compass, title: "Our Mission", text: mission },
    { icon: Eye, title: "Our Vision", text: vision },
    { icon: ScrollText, title: "Our History", text: history },
  ];

  return (
    <section className="section grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl2 shadow-glass-lg">
          <Image
            src="https://images.unsplash.com/photo-1500817487388-039e623edc21?q=80&w=1200&auto=format&fit=crop"
            alt="Ministry gathering under the mountains"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-outpost-navy/50 to-transparent" />
        </div>
        <div className="glass absolute -bottom-8 -right-6 hidden max-w-[220px] rounded-xl2 p-5 sm:block">
          <p className="font-display text-3xl font-bold text-outpost-navy">15+</p>
          <p className="text-sm text-outpost-navy/70">years pointing souls to Christ</p>
        </div>
      </motion.div>

      <div>
        <span className="mb-4 inline-block rounded-full bg-outpost-sky/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-outpost-blue">
          Who We Are
        </span>
        <h2 className="mb-6 font-display text-3xl font-bold text-outpost-navy sm:text-4xl">
          Introducing Enoch&apos;s Outpost Ministry
        </h2>
        <p className="mb-8 text-outpost-navy/70">
          Like Enoch of old who walked with God, our ministry exists to help
          believers draw near to Christ through the study of His Word, the
          restoration of health, and the strengthening of Christian homes —
          all in joyful expectation of His soon return.
        </p>

        <div className="space-y-6">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-outpost-gradient text-white">
                <p.icon size={20} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-outpost-navy">
                  {p.title}
                </h3>
                <p className="text-sm text-outpost-navy/70">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Button href="/about" variant="outline" className="mt-10">
          Read More About Us
        </Button>
      </div>
    </section>
  );
}
