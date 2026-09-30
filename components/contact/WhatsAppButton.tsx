"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glass-lg"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={26} />
    </motion.a>
  );
}
