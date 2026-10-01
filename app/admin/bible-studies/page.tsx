"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminBibleStudiesPage() {
  return (
    <CrudManager
      table="bible_studies"
      title="Bible Studies"
      description="Multi-lesson Bible study guides shown on the Resources page (Bible Studies tab)."
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "summary", label: "Summary", type: "textarea", required: true },
        { key: "lessons", label: "Number of Lessons", type: "number", required: true },
        { key: "image", label: "Cover Image", type: "image", bucket: "site-images" },
        { key: "published", label: "Published (visible on the public site)", type: "checkbox", helper: "Uncheck to save as a draft." },
      ]}
    />
  );
}
