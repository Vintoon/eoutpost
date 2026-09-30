"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Loader2 } from "lucide-react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase is not configured yet. See README.md.");
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.replace("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="glass w-full max-w-sm rounded-xl2 p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-outpost-gradient text-white">
            <LockKeyhole size={24} />
          </div>
          <h1 className="font-display text-xl font-bold text-outpost-navy">Admin Login</h1>
          <p className="mt-1 text-sm text-outpost-navy/60">Enoch&apos;s Outpost Ministry CMS</p>
        </div>

        {!isSupabaseConfigured() && (
          <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
            Supabase isn&apos;t connected yet — add your project keys to{" "}
            <code>.env.local</code> first. See README.md.
          </p>
        )}

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">{error}</p>
        )}

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-outpost-navy">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-outpost-navy/15 bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-outpost-blue"
          />
        </div>
        <div className="mb-6">
          <label className="mb-1.5 block text-sm font-medium text-outpost-navy">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-outpost-navy/15 bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-outpost-blue"
          />
        </div>
        <Button type="submit" className="w-full justify-center" disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          Log In
        </Button>
      </form>
    </div>
  );
}
