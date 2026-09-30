"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Newspaper,
  MessageSquareQuote,
  Sprout,
  HeartPulse,
  BookOpenText,
  PlayCircle,
  Library,
  Images,
  HandCoins,
  Inbox,
  Mail,
  Settings,
  LogOut,
  FileEdit,
  GraduationCap,
  X,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/site-content", label: "Homepage & About", icon: FileEdit },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/gardening", label: "Gardening", icon: Sprout },
  { href: "/admin/health", label: "Health", icon: HeartPulse },
  { href: "/admin/articles", label: "Articles", icon: BookOpenText },
  { href: "/admin/bible-studies", label: "Bible Studies", icon: GraduationCap },
  { href: "/admin/sermons", label: "Sermons", icon: PlayCircle },
  { href: "/admin/ebooks", label: "eBooks", icon: Library },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/donations", label: "Donation Channels", icon: HandCoins },
  { href: "/admin/messages", label: "Messages & Prayers", icon: Inbox },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-outpost-navy/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-outpost-navy/10 bg-white/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:bg-white/70",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-outpost-navy/10 px-6 py-6">
          <div>
            <p className="font-display text-lg font-bold text-outpost-navy">Enoch&apos;s Outpost</p>
            <p className="text-xs uppercase tracking-[0.2em] text-outpost-blue">Admin CMS</p>
          </div>
          <button onClick={onClose} className="text-outpost-navy/50 lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-outpost-navy text-white"
                    : "text-outpost-navy/70 hover:bg-outpost-navy/5"
                )}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-outpost-navy/10 p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-outpost-navy/70 hover:bg-outpost-navy/5"
          >
            <LogOut size={17} /> Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
