"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminEbooksPage() {
  return (
    <CrudManager
      table="books"
      title="eBooks"
      description="Books shown on the /ebooks page."
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "author", label: "Author", type: "text", required: true },
        { key: "price", label: "Price (KES)", type: "number", required: true },
        { key: "category", label: "Category", type: "text", required: true },
        { key: "pages", label: "Pages", type: "number" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "cover", label: "Cover Image", type: "image", bucket: "book-covers" },
        { key: "file_url", label: "eBook File", type: "file", helper: "Uploaded files are private — only accessible to admins until the purchase flow is built.", bucket: "ebook-files", bucketPublic: false },
        { key: "published", label: "Published (visible on the public site)", type: "checkbox", helper: "Uncheck to save as a draft." },
      ]}
    />
  );
}
