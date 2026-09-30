import Link from "next/link";
import Image from "next/image";
import { Facebook, Youtube, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/resources", label: "Resources" },
  { href: "/sermons", label: "Sermons" },
  { href: "/ebooks", label: "eBooks" },
  { href: "/gallery", label: "Gallery" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: siteConfig.whatsappLink, icon: MessageCircle, label: "WhatsApp" },
  { href: siteConfig.youtube, icon: Youtube, label: "YouTube" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-outpost-navy text-white">
      <div className="absolute inset-0 bg-outpost-radiance opacity-40" />
      <div className="section relative grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Enoch's Outpost Ministry logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-lg font-bold">Enoch&apos;s Outpost</span>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            A ministry preparing a people for the soon coming of Christ through
            Bible study, health education, and Christ-centered family living.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-outpost-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Connect</h4>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-outpost-sky"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/70">{siteConfig.location}</p>
          <p className="text-sm text-white/70">{siteConfig.email}</p>
          <p className="text-sm text-white/70">{siteConfig.phone}</p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Verse of Hope</h4>
          <p className="font-display text-lg italic leading-relaxed text-outpost-light">
            &ldquo;Looking unto Jesus, the author and finisher of our faith.&rdquo;
          </p>
          <p className="mt-2 text-sm text-white/60">Hebrews 12:2</p>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Enoch&apos;s Outpost Ministry. All rights reserved.
      </div>
    </footer>
  );
}
