"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/contact/WhatsAppButton";

/**
 * The public marketing chrome (fixed navbar, footer, WhatsApp button) should
 * only wrap the public site — the admin dashboard (/admin/**) has its own
 * Sidebar + mobile top bar and must not have the public fixed navbar
 * (z-50, pinned to the top) rendered on top of it.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
