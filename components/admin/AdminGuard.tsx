"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null | "loading">("loading");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      if (!data.session) router.replace("/admin/login");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (!sess) router.replace("/admin/login");
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-outpost-cream p-8 text-center">
        <div className="glass max-w-md rounded-xl2 p-8">
          <h1 className="mb-3 font-display text-xl font-bold text-outpost-navy">
            Supabase Not Connected
          </h1>
          <p className="text-sm leading-relaxed text-outpost-navy/70">
            The admin dashboard needs a Supabase project. Add{" "}
            <code className="rounded bg-outpost-navy/5 px-1">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
            and{" "}
            <code className="rounded bg-outpost-navy/5 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
            to your <code className="rounded bg-outpost-navy/5 px-1">.env.local</code>{" "}
            file (see README.md), then restart the app.
          </p>
        </div>
      </div>
    );
  }

  if (session === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-outpost-cream">
        <p className="text-sm text-outpost-navy/60">Loading…</p>
      </div>
    );
  }

  if (!session) return null; // redirecting to /admin/login

  return <>{children}</>;
}
