"use client";

import { useState } from "react";
import { Mail, MapPin, Facebook, Youtube, MessageCircle, Phone, HandHeart } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { siteConfig } from "@/lib/site-config";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const contactInfo = [
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.whatsapp, href: siteConfig.whatsappLink },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Youtube, label: "YouTube", value: siteConfig.youtubeHandle, href: siteConfig.youtube },
  { icon: Facebook, label: "Facebook", value: "Enoch's Outpost Ministry", href: "https://facebook.com" },
];

export default function ContactPage() {
  const [prayerName, setPrayerName] = useState("");
  const [prayerMessage, setPrayerMessage] = useState("");
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  async function handlePrayerSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.from("prayer_requests").insert({ name: prayerName, message: prayerMessage });
    }
    setPrayerSubmitted(true);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-outpost-gradient pt-40 pb-20 text-center text-white">
        <div className="absolute inset-0 bg-outpost-radiance" />
        <div className="section relative">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-outpost-light">
            We&apos;d Love to Hear From You
          </span>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Get in Touch
          </h1>
        </div>
      </section>

      <section className="section !pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="mb-6 font-display text-2xl font-bold text-outpost-navy">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-outpost-navy">
              Reach Us Directly
            </h2>
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="glass flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-outpost-gradient text-white">
                  <c.icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-outpost-navy/50">{c.label}</p>
                  <p className="text-sm font-medium text-outpost-navy">{c.value}</p>
                </div>
              </a>
            ))}

            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-outpost-gradient text-white">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-outpost-navy/50">Location</p>
                <p className="text-sm font-medium text-outpost-navy">{siteConfig.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-outpost-sand/40">
        <div className="section grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <GlassCard className="flex flex-col items-start">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-outpost-gradient text-white">
              <HandHeart size={22} />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-outpost-navy">
              Submit a Prayer Request
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-outpost-navy/70">
              Our prayer team meets weekly to intercede for every request
              submitted. Share what&apos;s on your heart — it will be held in
              confidence.
            </p>
            {prayerSubmitted ? (
              <p className="text-sm font-medium text-outpost-blue">
                Thank you — your request has been received. 🙏
              </p>
            ) : (
              <form onSubmit={handlePrayerSubmit} className="flex w-full flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={prayerName}
                  onChange={(e) => setPrayerName(e.target.value)}
                  className="w-full rounded-xl border border-outpost-navy/15 bg-white/70 px-4 py-3 text-sm outline-none focus:border-outpost-blue"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Share your prayer request..."
                  value={prayerMessage}
                  onChange={(e) => setPrayerMessage(e.target.value)}
                  className="w-full rounded-xl border border-outpost-navy/15 bg-white/70 px-4 py-3 text-sm outline-none focus:border-outpost-blue"
                />
                <Button type="submit" size="md" className="self-start">
                  Submit Request
                </Button>
              </form>
            )}
          </GlassCard>

          <div className="relative aspect-square w-full overflow-hidden rounded-xl2 shadow-glass-lg sm:aspect-video">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-outpost-navy/5">
              <MapPin size={32} className="text-outpost-blue" />
              <p className="text-sm font-medium text-outpost-navy/60">
                Google Maps — Nyeri, Kenya
              </p>
              <p className="max-w-xs text-center text-xs text-outpost-navy/40">
                An interactive map will be embedded here once the ministry
                address is finalized.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
