"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Upload } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export type FieldType = "text" | "textarea" | "number" | "date" | "select" | "checkbox" | "image" | "file";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  helper?: string;
  /** Only render this field when the predicate on the current draft returns true (e.g. show audio_url only when sermon_type is 'audio'). */
  showIf?: (draft: Row) => boolean;
  /**
   * Supabase Storage bucket to upload into for "image" / "file" fields.
   * When set, the form shows a real upload control (drag/pick a file)
   * in addition to the manual URL input. Omit to keep the field as a
   * plain URL text box (e.g. for images already hosted elsewhere).
   */
  bucket?: string;
  /** Set false for a private bucket (e.g. ebook files) — stores the storage path instead of a public URL. */
  bucketPublic?: boolean;
}

interface CrudManagerProps {
  table: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
  /** Columns shown in the list table; defaults to first 2 fields. */
  listColumns?: string[];
  orderBy?: string;
  ascending?: boolean;
  readOnly?: boolean; // for tables like messages: no add/edit, just view + delete
}

type Row = Record<string, any>;

function emptyRow(fields: FieldConfig[]): Row {
  const row: Row = {};
  fields.forEach((f) => {
    row[f.key] = f.type === "checkbox" ? false : "";
  });
  return row;
}

export default function CrudManager({
  table,
  title,
  description,
  fields,
  listColumns,
  orderBy = "created_at",
  ascending = false,
  readOnly = false,
}: CrudManagerProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Row>(emptyRow(fields));
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const supabase = getSupabaseBrowserClient();
  const cols = listColumns ?? fields.slice(0, 2).map((f) => f.key);

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending });
    if (error) setError(error.message);
    setRows(data ?? []);
    setLoading(false);
  }, [supabase, table, orderBy, ascending]);

  useEffect(() => {
    load();
  }, [load]);

  function openAdd() {
    setEditing(null);
    setDraft(emptyRow(fields));
    setFormOpen(true);
  }

  function openEdit(row: Row) {
    setEditing(row);
    setDraft({ ...row });
    setFormOpen(true);
  }

  async function uploadFile(field: FieldConfig, file: File) {
    if (!supabase || !field.bucket) return;
    setUploadingKey(field.key);
    setError(null);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from(field.bucket).upload(path, file);
      if (uploadError) {
        setError(uploadError.message);
        return;
      }
      if (field.bucketPublic === false) {
        setDraft((d) => ({ ...d, [field.key]: path }));
      } else {
        const { data } = supabase.storage.from(field.bucket).getPublicUrl(path);
        setDraft((d) => ({ ...d, [field.key]: data.publicUrl }));
      }
    } finally {
      setUploadingKey(null);
    }
  }

  async function save() {
    if (!supabase) return;
    if (uploadingKey) {
      setError("Please wait for the file upload to finish before saving.");
      return;
    }
    setSaving(true);
    setError(null);
    const payload: Row = {};
    fields.forEach((f) => {
      payload[f.key] = f.type === "number" ? Number(draft[f.key] || 0) : draft[f.key];
    });
    const query = editing
      ? supabase.from(table).update(payload).eq("id", editing.id)
      : supabase.from(table).insert(payload);
    const { error } = await query;
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setFormOpen(false);
    load();
  }

  async function remove(row: Row) {
    if (!supabase) return;
    if (!confirm("Delete this entry? This cannot be undone.")) return;
    const { error } = await supabase.from(table).delete().eq("id", row.id);
    if (error) setError(error.message);
    load();
  }

  async function clearAll() {
    if (!supabase) return;
    if (rows.length === 0) return;
    if (
      !confirm(
        `Delete ALL ${rows.length} entries in "${title}"? This is usually used to clear out the sample placeholder content. This cannot be undone.`
      )
    )
      return;
    const { error } = await supabase.from(table).delete().in("id", rows.map((r) => r.id));
    if (error) setError(error.message);
    load();
  }

  async function toggleBoolean(row: Row, key: string) {
    if (!supabase) return;
    await supabase.from(table).update({ [key]: !row[key] }).eq("id", row.id);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-outpost-navy">{title}</h1>
          {description && <p className="mt-1 text-sm text-outpost-navy/60">{description}</p>}
        </div>
        {!readOnly && (
          <div className="flex flex-wrap gap-2">
            {rows.length > 0 && (
              <Button size="sm" variant="outline" onClick={clearAll}>
                <Trash2 size={16} /> Clear All
              </Button>
            )}
            <Button size="sm" onClick={openAdd}>
              <Plus size={16} /> Add New
            </Button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="glass overflow-hidden rounded-xl2 !p-0">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10 text-outpost-navy/50">
            <Loader2 size={18} className="animate-spin" /> Loading…
          </div>
        ) : rows.length === 0 ? (
          <p className="p-10 text-center text-sm text-outpost-navy/50">No entries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-outpost-navy/10 text-xs uppercase tracking-wide text-outpost-navy/50">
                <tr>
                  {cols.map((c) => (
                    <th key={c} className="px-5 py-3 font-medium">
                      {fields.find((f) => f.key === c)?.label ?? c}
                    </th>
                  ))}
                  <th className="px-5 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-outpost-navy/5 last:border-0">
                    {cols.map((c) => {
                      const field = fields.find((f) => f.key === c);
                      if (field?.type === "checkbox") {
                        return (
                          <td key={c} className="px-5 py-3">
                            <button
                              onClick={() => toggleBoolean(row, c)}
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                row[c]
                                  ? "bg-outpost-blue/10 text-outpost-blue"
                                  : "bg-outpost-navy/5 text-outpost-navy/50"
                              }`}
                            >
                              {row[c] ? "Yes" : "No"}
                            </button>
                          </td>
                        );
                      }
                      return (
                        <td key={c} className="max-w-xs truncate px-5 py-3 text-outpost-navy/80">
                          {String(row[c] ?? "—")}
                        </td>
                      );
                    })}
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        {!readOnly && (
                          <button
                            onClick={() => openEdit(row)}
                            className="rounded-full p-2 text-outpost-navy/60 hover:bg-outpost-navy/5"
                            aria-label="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                        )}
                        <button
                          onClick={() => remove(row)}
                          className="rounded-full p-2 text-red-500 hover:bg-red-50"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-outpost-navy/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl2 bg-white p-6 shadow-glass-lg">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-outpost-navy">
                {editing ? "Edit Entry" : "Add New Entry"}
              </h2>
              <button onClick={() => setFormOpen(false)} aria-label="Close">
                <X size={18} className="text-outpost-navy/50" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
              className="flex flex-col gap-4"
            >
              {fields
                .filter((f) => !f.showIf || f.showIf(draft))
                .map((f) => (
                <div key={f.key}>
                  <label className="mb-1.5 block text-sm font-medium text-outpost-navy">
                    {f.label}
                    {f.required && <span className="text-red-500"> *</span>}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={4}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={draft[f.key] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                      className="w-full rounded-xl border border-outpost-navy/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-outpost-blue"
                    />
                  ) : f.type === "select" ? (
                    <select
                      required={f.required}
                      value={draft[f.key] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                      className="w-full rounded-xl border border-outpost-navy/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-outpost-blue"
                    >
                      <option value="">Select…</option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={Boolean(draft[f.key])}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.checked })}
                      className="h-5 w-5 rounded border-outpost-navy/30"
                    />
                  ) : (f.type === "image" || f.type === "file") && f.bucket ? (
                    <div className="space-y-2">
                      {f.type === "image" && draft[f.key] && f.bucketPublic !== false && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={draft[f.key]}
                          alt=""
                          className="h-24 w-24 rounded-lg border border-outpost-navy/10 object-cover"
                        />
                      )}
                      <div className="flex items-center gap-3">
                        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-outpost-navy/25 px-4 py-2.5 text-sm text-outpost-navy/70 hover:border-outpost-blue">
                          {uploadingKey === f.key ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <Upload size={15} />
                          )}
                          {uploadingKey === f.key ? "Uploading…" : "Upload file"}
                          <input
                            type="file"
                            accept={f.type === "image" ? "image/*" : undefined}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadFile(f, file);
                              e.target.value = "";
                            }}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        required={f.required}
                        placeholder="…or paste a URL directly"
                        value={draft[f.key] ?? ""}
                        onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                        className="w-full rounded-xl border border-outpost-navy/15 bg-white px-4 py-2.5 text-xs text-outpost-navy/70 outline-none focus:border-outpost-blue"
                      />
                    </div>
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={draft[f.key] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                      className="w-full rounded-xl border border-outpost-navy/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-outpost-blue"
                    />
                  )}
                  {f.helper && <p className="mt-1 text-xs text-outpost-navy/40">{f.helper}</p>}
                </div>
              ))}

              <div className="mt-2 flex justify-end gap-3">
                <Button type="button" variant="ghost" size="sm" onClick={() => setFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={saving || uploadingKey !== null}>
                  {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                  {uploadingKey ? "Waiting for upload…" : editing ? "Save Changes" : "Add Entry"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
