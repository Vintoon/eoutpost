"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.from("newsletter_subscribers").insert({ email });
    }
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      className="glass flex flex-col items-center gap-4 rounded-xl2 p-8 text-center sm:p-12"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-outpost-gradient text-white">
        <Mail size={24} />
      </div>
      <h3 className="font-display text-2xl font-bold text-outpost-navy">
        Stay Rooted in the Word
      </h3>
      <p className="max-w-md text-sm text-outpost-navy/70">
        Subscribe to receive new sermons, Bible studies, and ministry updates
        straight to your inbox.
      </p>
      {submitted ? (
        <p className="font-medium text-outpost-blue">
          Thank you for subscribing! 🙏
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-full border border-outpost-navy/15 bg-white/70 px-5 py-3 text-sm outline-none focus:border-outpost-blue"
          />
          <Button type="submit" size="md">
            <Send size={16} /> Subscribe
          </Button>
        </form>
      )}
    </motion.div>
  );
}
