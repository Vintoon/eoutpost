"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { siteContentDefaults } from "@/lib/site-content-defaults";

const fields: { key: keyof typeof siteContentDefaults; label: string; multiline?: boolean }[] = [
  { key: "hero_eyebrow", label: "Hero — small label above the heading" },
  { key: "hero_title", label: "Hero — main heading", multiline: true },
  { key: "hero_subtitle", label: "Hero — subtitle", multiline: true },
  { key: "about_mission", label: "About — Mission", multiline: true },
  { key: "about_vision", label: "About — Vision", multiline: true },
  { key: "about_history", label: "About — History", multiline: true },
  { key: "ministry_health_blurb", label: "Ministry Area — Health blurb", multiline: true },
  { key: "ministry_prophecy_blurb", label: "Ministry Area — Prophecy blurb", multiline: true },
  { key: "ministry_children_blurb", label: "Ministry Area — Children's blurb", multiline: true },
  { key: "ministry_family_blurb", label: "Ministry Area — Family Life blurb", multiline: true },
];

export default function AdminSiteContentPage() {
  const [values, setValues] = useState<Record<string, string>>({ ...siteContentDefaults });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase.from("site_content").select("key,value");
      if (!error && data && data.length > 0) {
        const map = Object.fromEntries(data.map((r: { key: string; value: string }) => [r.key, r.value]));
        setValues((v) => ({ ...v, ...map }));
      }
      setLoading(false);
    })();
  }, [supabase]);

  async function save() {
    if (!supabase) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    const rows = fields.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-outpost-navy">Homepage &amp; About</h1>
          <p className="mt-1 text-sm text-outpost-navy/60">
            Edit the hero heading, mission/vision/history, and the four ministry-area blurbs
            without touching code.
          </p>
        </div>
        <Button size="sm" onClick={save} disabled={saving || loading}>
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </div>

      {error && <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {saved && <div className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">Saved.</div>}

      {loading ? (
        <div className="flex items-center justify-center gap-2 p-10 text-outpost-navy/50">
          <Loader2 size={18} className="animate-spin" /> Loading…
        </div>
      ) : (
        <div className="glass grid grid-cols-1 gap-5 rounded-xl2 p-6 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className={f.multiline ? "sm:col-span-2" : ""}>
              <label className="mb-1.5 block text-sm font-medium text-outpost-navy">{f.label}</label>
              {f.multiline ? (
                <textarea
                  rows={3}
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                  className="w-full rounded-xl border border-outpost-navy/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-outpost-blue"
                />
              ) : (
                <input
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                  className="w-full rounded-xl border border-outpost-navy/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-outpost-blue"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
