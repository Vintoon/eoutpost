"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminGalleryPage() {
  return (
    <CrudManager
      table="gallery"
      title="Gallery"
      description="Photos shown on the /gallery page."
      fields={[
        { key: "image", label: "Image", type: "image", required: true, bucket: "gallery-images" },
        { key: "caption", label: "Caption", type: "text" },
        {
          key: "category",
          label: "Category",
          type: "select",
          required: true,
          options: ["Evangelism", "Health Ministry", "Children's Ministry", "Family Seminars", "Camp Meetings"],
        },
      ]}
    />
  );
}
