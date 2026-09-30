import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import BookCard from "@/components/cards/BookCard";
import { getBooks } from "@/lib/supabase/queries";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const books = await getBooks();
  const book = books.find((b) => b.id === id);
  if (!book) notFound();

  const related = books.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 3);

  return (
    <div className="pt-32">
      <div className="section">
        <Link
          href="/ebooks"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-outpost-blue"
        >
          <ArrowLeft size={16} /> Back to eBooks
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl2 shadow-glass-lg">
            <Image src={book.cover} alt={book.title} fill className="object-cover" />
          </div>

          <div>
            <Badge className="mb-4">{book.category}</Badge>
            <h1 className="mb-2 font-display text-3xl font-bold text-outpost-navy sm:text-4xl">
              {book.title}
            </h1>
            <p className="mb-6 text-outpost-navy/60">by {book.author}</p>
            <p className="mb-8 leading-relaxed text-outpost-navy/70">
              {book.description}
            </p>

            <div className="mb-8 flex items-center gap-6 text-sm text-outpost-navy/60">
              <span className="flex items-center gap-2">
                <BookOpen size={16} /> {book.pages} pages
              </span>
              <span className="flex items-center gap-2">
                <Smartphone size={16} /> ePub &amp; PDF
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} /> Secure checkout
              </span>
            </div>

            <div className="glass mb-8 flex flex-col gap-4 rounded-xl2 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-outpost-navy/60">Price</p>
                <p className="font-display text-3xl font-bold text-outpost-blue">
                  KSh {book.price.toLocaleString()}
                </p>
              </div>
              <Button size="lg">Buy Now</Button>
            </div>
            <p className="text-xs text-outpost-navy/40">
              Checkout will be available soon via M-Pesa. This is a preview of
              the eBook store interface.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 font-display text-2xl font-bold text-outpost-navy">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((b, i) => (
                <BookCard key={b.id} book={b} delay={i * 0.08} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
