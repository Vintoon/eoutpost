"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminEventsPage() {
  return (
    <CrudManager
      table="events"
      title="Events"
      description="Ministry events shown on the public /events page."
      orderBy="date"
      ascending
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "date", label: "Date", type: "date", required: true },
        { key: "time", label: "Time", type: "text", placeholder: "e.g. 10:00 AM" },
        { key: "location", label: "Location / Venue", type: "text" },
        { key: "image", label: "Event Image", type: "image", bucket: "site-images" },
        { key: "registration_url", label: "Registration Link", type: "text" },
        {
          key: "published",
          label: "Published (visible on the public site)",
          type: "checkbox",
          helper: "Uncheck to save as a draft — it stays hidden from visitors until you publish it.",
        },
      ]}
    />
  );
}
