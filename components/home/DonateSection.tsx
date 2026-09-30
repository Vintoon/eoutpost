"use client";

import { motion } from "framer-motion";
import { HandCoins, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export default function DonateSection() {
  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-xl2 bg-outpost-navy px-8 py-16 text-center shadow-glass-lg sm:px-16"
      >
        <div className="absolute inset-0 bg-outpost-radiance opacity-60" />
        <div className="relative flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-outpost-gold text-white shadow-glass">
            <HandCoins size={30} />
          </div>
          <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Partner With Us in Ministry
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-white/85">
            Your giving supports Bible study outreach, health seminars, and
            family ministry across Kenya. &ldquo;Freely ye have received,
            freely give.&rdquo; — Matthew 10:8
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/donate" variant="gold" size="md">
              <HandCoins size={18} /> Donate Now
            </Button>
            <Button href={siteConfig.whatsappLink} variant="secondary" size="md">
              <MessageCircle size={18} /> Ask a Question
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
