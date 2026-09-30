"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminHealthPage() {
  return (
    <CrudManager
      table="health_articles"
      title="Health Ministry"
      description="Health and wellness articles shown on the homepage and /health."
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
        { key: "content", label: "Full Content", type: "textarea" },
        { key: "image", label: "Image", type: "image", bucket: "site-images" },
        { key: "category", label: "Category", type: "text", placeholder: "e.g. Nutrition" },
      ]}
    />
  );
}
