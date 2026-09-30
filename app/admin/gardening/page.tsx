"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminGardeningPage() {
  return (
    <CrudManager
      table="gardening_tips"
      title="Gardening Ministry"
      description="Kitchen-garden and natural-living tips shown on the homepage and /gardening."
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
        { key: "content", label: "Full Content", type: "textarea" },
        { key: "image", label: "Image", type: "image", bucket: "site-images" },
        { key: "season", label: "Season / Tag", type: "text", placeholder: "e.g. Long Rains" },
      ]}
    />
  );
}
