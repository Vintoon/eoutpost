"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLogin) {
    return <div className="min-h-screen bg-outpost-cream font-body">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-outpost-cream font-body">
      <AdminGuard>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-outpost-navy/10 bg-white/70 px-4 py-3 backdrop-blur-xl lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-outpost-navy"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <p className="font-display text-base font-bold text-outpost-navy">Admin CMS</p>
          </div>
          <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
        </div>
      </AdminGuard>
    </div>
  );
}
