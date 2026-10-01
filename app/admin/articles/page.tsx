"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminArticlesPage() {
  return (
    <CrudManager
      table="articles"
      title="Bible Studies / Articles"
      description="Articles shown on the /resources page."
      orderBy="date"
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
        { key: "content", label: "Full Content", type: "textarea" },
        { key: "category", label: "Category", type: "text", required: true },
        { key: "read_time", label: "Read Time", type: "text", placeholder: "e.g. 5 min read" },
        { key: "date", label: "Date", type: "date", required: true },
        { key: "image", label: "Image", type: "image", bucket: "site-images" },
        { key: "published", label: "Published (visible on the public site)", type: "checkbox", helper: "Uncheck to save as a draft." },
      ]}
    />
  );
}
