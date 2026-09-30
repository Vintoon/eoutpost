"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminTestimonialsPage() {
  return (
    <CrudManager
      table="testimonials"
      title="Testimonials"
      description="Stories from members and visitors, shown on the homepage and /testimonials."
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "location", label: "Location", type: "text" },
        { key: "message", label: "Testimonial", type: "textarea", required: true },
        { key: "image", label: "Photo", type: "image", bucket: "site-images" },
      ]}
    />
  );
}
