"use client";

import { useMemo, useState } from "react";
import BookCard from "@/components/cards/BookCard";
import { cn } from "@/lib/utils";
import type { Book } from "@/data/books";

export default function EbooksClient({ books }: { books: Book[] }) {
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(books.map((b) => b.category)))],
    [books]
  );

  const filtered = useMemo(
    () => books.filter((b) => category === "All" || b.category === category),
    [books, category]
  );

  if (books.length === 0) {
    return (
      <p className="py-20 text-center text-outpost-navy/60">
        No eBooks have been added yet. Check back soon.
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b, i) => (
            <BookCard key={b.id} book={b} delay={i * 0.06} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-outpost-navy/60">No eBooks in this category yet.</p>
      )}
    </>
  );
}
