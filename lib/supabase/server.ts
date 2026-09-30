import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for use in server components / route handlers.
 * Uses the anon key (safe for reads under RLS). Returns null when Supabase
 * env vars aren't set, so callers should fall back to seed data.
 *
 * IMPORTANT: fetch is forced to `cache: "no-store"` here. Next.js patches
 * the global `fetch` and, by default, caches *any* fetch made during a
 * Server Component render — including the ones supabase-js makes under the
 * hood. Without this override, admin edits/deletes can appear to "not take
 * effect" on the public site because Next keeps serving a stale cached
 * response instead of re-querying Supabase.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
