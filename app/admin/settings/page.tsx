"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

const FIELDS: { key: keyof typeof siteConfig; label: string; helper?: string }[] = [
  { key: "phone", label: "Phone Number" },
  { key: "whatsapp", label: "WhatsApp Number (display)" },
  { key: "whatsappLink", label: "WhatsApp Link", helper: "e.g. https://wa.me/254110040420" },
  { key: "email", label: "Email Address" },
  { key: "youtube", label: "YouTube Channel URL" },
  { key: "youtubeHandle", label: "YouTube Handle (display)" },
  { key: "location", label: "Location" },
];

export default function AdminSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({ ...siteConfig });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("site_settings")
      .select("key,value")
      .then(({ data }) => {
        if (data && data.length) {
          const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
          setValues((v) => ({ ...v, ...map }));
        }
        setLoading(false);
      });
  }, [supabase]);

  async function save() {
    if (!supabase) return;
    setSaving(true);
    setSaved(false);
    const rows = FIELDS.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    setSaved(true);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-1 font-display text-2xl font-bold text-outpost-navy">Site Settings</h1>
      <p className="mb-8 text-sm text-outpost-navy/60">
        These update the phone, WhatsApp, email, and YouTube details shown across the site.
      </p>

      {loading ? (
        <div className="flex items-center gap-2 text-outpost-navy/50">
          <Loader2 size={18} className="animate-spin" /> Loading…
        </div>
      ) : (
        <div className="glass flex flex-col gap-5 rounded-xl2 p-6">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="mb-1.5 block text-sm font-medium text-outpost-navy">
                {f.label}
              </label>
              <input
                type="text"
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="w-full rounded-xl border border-outpost-navy/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-outpost-blue"
              />
              {f.helper && <p className="mt-1 text-xs text-outpost-navy/40">{f.helper}</p>}
            </div>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <Button size="sm" onClick={save} disabled={saving}>
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Settings
            </Button>
            {saved && <span className="text-sm text-outpost-blue">Saved ✓</span>}
          </div>
        </div>
      )}
    </div>
  );
}
