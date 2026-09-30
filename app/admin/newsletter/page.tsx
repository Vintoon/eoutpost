"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminNewsletterPage() {
  return (
    <CrudManager
      table="newsletter_subscribers"
      title="Newsletter Subscribers"
      description="Emails collected from the newsletter sign-up form."
      readOnly
      fields={[{ key: "email", label: "Email", type: "text" }]}
    />
  );
}
