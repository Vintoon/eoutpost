"use client";

import { useMemo, useState } from "react";
import GalleryCard from "@/components/cards/GalleryCard";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/data/gallery";

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((img) => img.category)))],
    [images]
  );

  const filtered = useMemo(
    () => images.filter((img) => category === "All" || img.category === category),
    [images, category]
  );

  if (images.length === 0) {
    return (
      <p className="py-20 text-center text-outpost-navy/60">
        No photos have been added yet. Check back soon.
      </p>
    );
  }

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition-all",
              category === cat
                ? "bg-outpost-gradient text-white shadow-glass"
                : "glass text-outpost-navy/70 hover:text-outpost-navy"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img, i) => (
            <GalleryCard key={img.id} item={img} delay={i * 0.05} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-outpost-navy/60">No photos in this category yet.</p>
      )}
    </>
  );
}
