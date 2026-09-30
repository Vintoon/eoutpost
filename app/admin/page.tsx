"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Newspaper, MessageSquareQuote, Sprout, HeartPulse, BookOpenText,
  PlayCircle, Library, Images, HandCoins, Inbox, Mail, GraduationCap,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const cards = [
  { table: "news", label: "News Items", href: "/admin/news", icon: Newspaper },
  { table: "testimonials", label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { table: "gardening_tips", label: "Gardening Tips", href: "/admin/gardening", icon: Sprout },
  { table: "health_articles", label: "Health Articles", href: "/admin/health", icon: HeartPulse },
  { table: "articles", label: "Articles", href: "/admin/articles", icon: BookOpenText },
  { table: "bible_studies", label: "Bible Studies", href: "/admin/bible-studies", icon: GraduationCap },
  { table: "sermons", label: "Sermons", href: "/admin/sermons", icon: PlayCircle },
  { table: "books", label: "eBooks", href: "/admin/ebooks", icon: Library },
  { table: "gallery", label: "Gallery Images", href: "/admin/gallery", icon: Images },
  { table: "donation_channels", label: "Donation Channels", href: "/admin/donations", icon: HandCoins },
  { table: "contact_messages", label: "Contact Messages", href: "/admin/messages", icon: Inbox },
  { table: "newsletter_subscribers", label: "Subscribers", href: "/admin/newsletter", icon: Mail },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    (async () => {
      const entries = await Promise.all(
        cards.map(async (c) => {
          const { count } = await supabase.from(c.table).select("*", { count: "exact", head: true });
          return [c.table, count ?? 0] as const;
        })
      );
      setCounts(Object.fromEntries(entries));
    })();
  }, []);

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-bold text-outpost-navy">Dashboard</h1>
      <p className="mb-8 text-sm text-outpost-navy/60">
        Manage every part of the Enoch&apos;s Outpost website from here.
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.table}
            href={c.href}
            className="glass flex items-center gap-4 rounded-xl2 p-5 transition-transform hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-outpost-gradient text-white">
              <c.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-outpost-navy">{counts[c.table] ?? "–"}</p>
              <p className="text-sm text-outpost-navy/60">{c.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
