"use client";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminDonationsPage() {
  return (
    <CrudManager
      table="donation_channels"
      title="Donation Channels"
      description="Giving methods shown on the /donate page (M-Pesa, bank, etc.)."
      fields={[
        { key: "method", label: "Method Name", type: "text", required: true, placeholder: "e.g. M-Pesa Paybill" },
        { key: "details", label: "Details", type: "text", required: true, placeholder: "e.g. Paybill 000000, Acc: NAME" },
        { key: "instructions", label: "Instructions", type: "textarea" },
      ]}
    />
  );
}
