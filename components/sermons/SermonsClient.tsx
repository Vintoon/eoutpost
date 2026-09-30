"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import SermonCard from "@/components/cards/SermonCard";
import { cn } from "@/lib/utils";
import type { Sermon } from "@/data/sermons";

export default function SermonsClient({ sermons }: { sermons: Sermon[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(sermons.map((s) => s.category)))],
    [sermons]
  );

  const filtered = useMemo(() => {
    return sermons.filter((s) => {
      const matchesCategory = category === "All" || s.category === category;
      const matchesQuery =
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.speaker.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [sermons, query, category]);

  return (
    <>
      {sermons.length > 0 && (
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outpost-navy/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sermons or speakers..."
              className="w-full rounded-full border border-outpost-navy/15 bg-white/70 py-3 pl-11 pr-4 text-sm outline-none focus:border-outpost-blue"
            />
          </div>

          <div className="flex flex-wrap gap-2">
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
        </div>
      )}

      {sermons.length === 0 ? (
        <p className="py-20 text-center text-outpost-navy/60">
          No sermons have been added yet. Check back soon.
        </p>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <SermonCard key={s.id} sermon={s} delay={i * 0.06} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-outpost-navy/60">
          No sermons match your search. Try a different keyword or category.
        </p>
      )}
    </>
  );
}
