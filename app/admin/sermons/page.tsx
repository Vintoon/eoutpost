"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminSermonsPage() {
  return (
    <CrudManager
      table="sermons"
      title="Sermons"
      description="Sermon videos shown on the /sermons page."
      orderBy="date"
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "speaker", label: "Speaker", type: "text", required: true },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 48:12" },
        { key: "category", label: "Category", type: "text", required: true },
        { key: "date", label: "Date", type: "date", required: true },
        {
          key: "sermon_type",
          label: "Sermon Type",
          type: "select",
          required: true,
          options: ["youtube", "audio"],
          helper: "Choose how this sermon is delivered — a YouTube video or an uploaded audio file.",
        },
        {
          key: "youtube_id",
          label: "YouTube Video ID",
          type: "text",
          helper: "The part after v= in the YouTube URL",
          showIf: (d) => d.sermon_type !== "audio",
        },
        {
          key: "audio_url",
          label: "Audio File",
          type: "file",
          bucket: "sermon-media",
          helper: "Upload an MP3/audio file, or paste a direct URL",
          showIf: (d) => d.sermon_type === "audio",
        },
        { key: "thumbnail", label: "Thumbnail Image", type: "image", bucket: "sermon-media", required: true },
        { key: "published", label: "Published (visible on the public site)", type: "checkbox", helper: "Uncheck to save as a draft." },
      ]}
    />
  );
}
