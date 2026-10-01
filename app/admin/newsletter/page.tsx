"use client";

import { useEffect, useState } from "react";
import { Loader2, Send, Users } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminNewsletterPage() {
  const supabase = getSupabaseBrowserClient();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [historyVersion, setHistoryVersion] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => setSubscriberCount(count ?? 0));
  }, [supabase, historyVersion]);

  async function send() {
    if (!supabase) return;
    if (!subject.trim() || !body.trim()) {
      setError("Please fill in both the subject and the message.");
      return;
    }
    if (!subscriberCount) {
      setError("There are no subscribers to send to yet.");
      return;
    }
    if (
      !confirm(
        `Send this newsletter to all ${subscriberCount} subscriber${subscriberCount === 1 ? "" : "s"}? This cannot be undone.`
      )
    )
      return;

    setSending(true);
    setError(null);
    setSuccess(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, body }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setSuccess(`Sent to ${json.recipientCount} subscriber${json.recipientCount === 1 ? "" : "s"}.`);
      setSubject("");
      setBody("");
      setHistoryVersion((v) => v + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-1 font-display text-2xl font-bold text-outpost-navy">Newsletter</h1>
        <p className="text-sm text-outpost-navy/60">
          Compose and send an email update to everyone who has subscribed on the website.
        </p>
      </div>

      <div className="glass max-w-2xl rounded-xl2 p-6">
        <div className="mb-5 flex items-center gap-2 text-sm font-medium text-outpost-navy/70">
          <Users size={16} />
          {subscriberCount === null ? "Loading subscribers…" : `${subscriberCount} subscriber${subscriberCount === 1 ? "" : "s"}`}
        </div>

        {error && <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        {success && <div className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>}

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-outpost-navy">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. December Camp Meeting — Save the Date"
            className="w-full rounded-xl border border-outpost-navy/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-outpost-blue"
          />
        </div>

        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-medium text-outpost-navy">Message</label>
          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your update here. Leave a blank line between paragraphs."
            className="w-full rounded-xl border border-outpost-navy/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-outpost-blue"
          />
        </div>

        <Button onClick={send} disabled={sending}>
          {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {sending ? "Sending…" : "Send Newsletter"}
        </Button>
      </div>

      <div key={historyVersion}>
        <CrudManager
          table="newsletter_campaigns"
          title="Send History"
          description="Past newsletters sent from this page."
          readOnly
          listColumns={["subject", "recipient_count", "status", "sent_at"]}
          fields={[
            { key: "subject", label: "Subject", type: "text" },
            { key: "recipient_count", label: "Recipients", type: "number" },
            { key: "status", label: "Status", type: "text" },
            { key: "sent_at", label: "Sent At", type: "date" },
          ]}
        />
      </div>

      <div>
        <CrudManager
          table="newsletter_subscribers"
          title="Subscribers"
          description="Emails collected from the newsletter sign-up form."
          readOnly
          fields={[{ key: "email", label: "Email", type: "text" }]}
        />
      </div>
    </div>
  );
}
