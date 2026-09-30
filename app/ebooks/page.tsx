import EbooksClient from "@/components/ebooks/EbooksClient";
import { getBooks } from "@/lib/supabase/queries";

export const metadata = { title: "eBooks | Enoch's Outpost Ministry" };

export default async function EbooksPage() {
  const books = await getBooks();

  return (
    <>
      <section className="relative overflow-hidden bg-outpost-gradient pt-40 pb-20 text-center text-white">
        <div className="absolute inset-0 bg-outpost-radiance" />
        <div className="section relative">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-outpost-light">
            Bookstore
          </span>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            eBooks to Deepen Your Faith
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Digital titles on prophecy, health, family, and devotional life —
            priced in Kenyan Shillings.
          </p>
        </div>
      </section>

      <section className="section !pt-16">
        <EbooksClient books={books} />
      </section>
    </>
  );
}
