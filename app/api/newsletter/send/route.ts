import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// Resend's bulk-send endpoint caps each call's `to` list — we chunk into
// batches and BCC each batch so subscribers never see each other's emails.
const BATCH_SIZE = 50;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function POST(req: NextRequest) {
  const serviceClient = getSupabaseServiceClient();
  if (!serviceClient) {
    return NextResponse.json(
      { error: "Supabase service role key is not configured on the server." },
      { status: 500 }
    );
  }

  // --- Verify the caller is a logged-in admin ---
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const { data: userData, error: userError } = await serviceClient.auth.getUser(token);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  // --- Validate input ---
  let subject: string, body: string;
  try {
    const json = await req.json();
    subject = (json.subject || "").trim();
    body = (json.body || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!subject || !body) {
    return NextResponse.json({ error: "Subject and body are required." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.NEWSLETTER_FROM_EMAIL;
  if (!resendApiKey || !fromEmail) {
    return NextResponse.json(
      {
        error:
          "Email sending isn't configured yet. Set RESEND_API_KEY and NEWSLETTER_FROM_EMAIL in your environment variables.",
      },
      { status: 500 }
    );
  }

  // --- Load subscribers ---
  const { data: subscribers, error: subError } = await serviceClient
    .from("newsletter_subscribers")
    .select("email");
  if (subError) {
    return NextResponse.json({ error: subError.message }, { status: 500 });
  }
  const emails = (subscribers ?? []).map((s) => s.email).filter(Boolean);
  if (emails.length === 0) {
    return NextResponse.json({ error: "There are no subscribers yet." }, { status: 400 });
  }

  // --- Send via Resend (direct REST call, no extra dependency) ---
  const htmlBody = body
    .split(/\n{2,}/)
    .map((para) => `<p style="margin:0 0 1em;line-height:1.6;">${para.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  const batches = chunk(emails, BATCH_SIZE);
  try {
    for (const batch of batches) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: fromEmail, // send "to" ourselves, every real recipient is BCC'd
          bcc: batch,
          subject,
          html: htmlBody,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Resend error (${res.status}): ${errText}`);
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error sending email.";
    await serviceClient.from("newsletter_campaigns").insert({
      subject,
      body,
      recipient_count: emails.length,
      status: "failed",
      error: message,
    });
    return NextResponse.json({ error: message }, { status: 502 });
  }

  await serviceClient.from("newsletter_campaigns").insert({
    subject,
    body,
    recipient_count: emails.length,
    status: "sent",
  });

  return NextResponse.json({ success: true, recipientCount: emails.length });
}
