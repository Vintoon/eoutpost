"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/data/gallery";

export default function GalleryCard({
  item,
  delay,
}: {
  item: GalleryImage;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative overflow-hidden rounded-xl2 shadow-glass",
        item.span
      )}
    >
      <Image
        src={item.image}
        alt={item.caption}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-outpost-navy/80 via-outpost-navy/0 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-sm font-medium text-white">{item.caption}</p>
      </div>
    </motion.div>
  );
}
