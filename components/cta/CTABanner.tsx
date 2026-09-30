"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { BookOpenText, PlayCircle, Library } from "lucide-react";

const actions = [
  { icon: BookOpenText, label: "Study the Bible", href: "/resources" },
  { icon: PlayCircle, label: "Watch Sermons", href: "/sermons" },
  { icon: Library, label: "Read Resources", href: "/ebooks" },
];

export default function CTABanner() {
  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-xl2 bg-outpost-gradient px-8 py-16 text-center shadow-glass-lg sm:px-16"
      >
        <div className="absolute inset-0 bg-outpost-radiance" />
        <div className="relative">
          <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Take the Next Step in Your Walk with Christ
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-white/85">
            Whatever season you are in, there is a resource here to draw you
            closer to Jesus today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {actions.map((a) => (
              <Button key={a.label} href={a.href} variant="secondary" size="md">
                <a.icon size={18} /> {a.label}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
