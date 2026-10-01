"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminNewsPage() {
  return (
    <CrudManager
      table="news"
      title="News"
      description="Announcements and updates shown in the News section on the homepage."
      orderBy="date"
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
        { key: "content", label: "Full Content", type: "textarea" },
        { key: "image", label: "Image", type: "image", bucket: "site-images" },
        { key: "date", label: "Date", type: "date", required: true },
        { key: "published", label: "Published (visible on the public site)", type: "checkbox", helper: "Uncheck to save as a draft." },
      ]}
    />
  );
}
