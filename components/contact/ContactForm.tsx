"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.from("contact_messages").insert({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
    }
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass flex flex-col items-center gap-4 rounded-xl2 p-10 text-center">
        <CheckCircle2 size={40} className="text-outpost-blue" />
        <h3 className="font-display text-xl font-semibold text-outpost-navy">
          Message Sent
        </h3>
        <p className="text-sm text-outpost-navy/70">
          Thank you for reaching out. Our team will respond within 1–2
          business days.
        </p>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      onSubmit={handleSubmit}
      className="glass flex flex-col gap-5 rounded-xl2 p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-outpost-navy">
            Full Name
          </label>
          <input
            required
            type="text"
            placeholder="Jane Wanjiru"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-outpost-navy/15 bg-white/70 px-4 py-3 text-sm outline-none focus:border-outpost-blue"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-outpost-navy">
            Email Address
          </label>
          <input
            required
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-outpost-navy/15 bg-white/70 px-4 py-3 text-sm outline-none focus:border-outpost-blue"
          />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-outpost-navy">
          Subject
        </label>
        <input
          type="text"
          placeholder="How can we help?"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded-xl border border-outpost-navy/15 bg-white/70 px-4 py-3 text-sm outline-none focus:border-outpost-blue"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-outpost-navy">
          Message
        </label>
        <textarea
          required
          rows={5}
          placeholder="Write your message here..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl border border-outpost-navy/15 bg-white/70 px-4 py-3 text-sm outline-none focus:border-outpost-blue"
        />
      </div>
      <Button type="submit" size="md" className="self-start" disabled={submitting}>
        {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        Send Message
      </Button>
    </motion.form>
  );
}
