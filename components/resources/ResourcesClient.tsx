"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ArticleCard from "@/components/cards/ArticleCard";
import BibleStudyCard from "@/components/cards/BibleStudyCard";
import SermonCard from "@/components/cards/SermonCard";
import BookCard from "@/components/cards/BookCard";
import { cn } from "@/lib/utils";
import type { Article, BibleStudy } from "@/data/articles";
import type { Sermon } from "@/data/sermons";
import type { Book } from "@/data/books";

const tabs = [
  { id: "studies", label: "Bible Studies" },
  { id: "articles", label: "Articles" },
  { id: "sermons", label: "Sermons" },
  { id: "ebooks", label: "eBooks" },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface ResourcesClientProps {
  bibleStudies: BibleStudy[];
  articles: Article[];
  sermons: Sermon[];
  books: Book[];
}

function ResourcesContent({ bibleStudies, articles, sermons, books }: ResourcesClientProps) {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabId) || "studies";
  const [active, setActive] = useState<TabId>(
    tabs.some((t) => t.id === initialTab) ? initialTab : "studies"
  );

  return (
    <>
      <section className="relative overflow-hidden bg-outpost-gradient pt-40 pb-20 text-center text-white">
        <div className="absolute inset-0 bg-outpost-radiance" />
        <div className="section relative">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-outpost-light">
            Grow in the Word
          </span>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Resources for Every Step of Your Journey
          </h1>
        </div>
      </section>

      <section className="section !pt-16">
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
                active === tab.id
                  ? "bg-outpost-gradient text-white shadow-glass"
                  : "glass text-outpost-navy/70 hover:text-outpost-navy"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {active === "studies" && (
            bibleStudies.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bibleStudies.map((s, i) => (
                  <BibleStudyCard key={s.id} study={s} delay={i * 0.08} />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-outpost-navy/60">No Bible studies have been added yet.</p>
            )
          )}

          {active === "articles" && (
            articles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {articles.map((a, i) => (
                  <ArticleCard key={a.id} article={a} delay={i * 0.08} />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-outpost-navy/60">No articles have been added yet.</p>
            )
          )}

          {active === "sermons" && (
            sermons.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sermons.map((s, i) => (
                  <SermonCard key={s.id} sermon={s} delay={i * 0.08} />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-outpost-navy/60">No sermons have been added yet.</p>
            )
          )}

          {active === "ebooks" && (
            books.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {books.map((b, i) => (
                  <BookCard key={b.id} book={b} delay={i * 0.08} />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-outpost-navy/60">No eBooks have been added yet.</p>
            )
          )}
        </motion.div>
      </section>
    </>
  );
}

export default function ResourcesClient(props: ResourcesClientProps) {
  return (
    <Suspense fallback={null}>
      <ResourcesContent {...props} />
    </Suspense>
  );
}
