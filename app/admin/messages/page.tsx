"use client";
import { useState } from "react";
import CrudManager from "@/components/admin/CrudManager";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [tab, setTab] = useState<"contact" | "prayer">("contact");

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <Button
          size="sm"
          variant={tab === "contact" ? "primary" : "outline"}
          onClick={() => setTab("contact")}
        >
          Contact Messages
        </Button>
        <Button
          size="sm"
          variant={tab === "prayer" ? "primary" : "outline"}
          onClick={() => setTab("prayer")}
        >
          Prayer Requests
        </Button>
      </div>

      {tab === "contact" ? (
        <CrudManager
          key="contact"
          table="contact_messages"
          title="Contact Messages"
          description="Submitted from the website's Contact form."
          readOnly
          listColumns={["name", "email", "subject", "message", "is_read"]}
          fields={[
            { key: "name", label: "Name", type: "text" },
            { key: "email", label: "Email", type: "text" },
            { key: "subject", label: "Subject", type: "text" },
            { key: "message", label: "Message", type: "textarea" },
            { key: "is_read", label: "Read", type: "checkbox" },
          ]}
        />
      ) : (
        <CrudManager
          key="prayer"
          table="prayer_requests"
          title="Prayer Requests"
          description="Submitted from the website's prayer request form."
          readOnly
          listColumns={["name", "message", "is_prayed"]}
          fields={[
            { key: "name", label: "Name", type: "text" },
            { key: "message", label: "Request", type: "textarea" },
            { key: "is_prayed", label: "Prayed For", type: "checkbox" },
          ]}
        />
      )}
    </div>
  );
}
