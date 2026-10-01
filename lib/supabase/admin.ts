import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — bypasses Row Level Security entirely.
 * NEVER import this from a Client Component ("use client") or any file that
 * runs in the browser, and never expose SUPABASE_SERVICE_ROLE_KEY with a
 * NEXT_PUBLIC_ prefix. Only use inside Route Handlers (app/api/**) for
 * privileged operations an admin triggered (e.g. reading every subscriber
 * email to send a newsletter).
 */
export function getSupabaseServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
