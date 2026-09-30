import SermonsClient from "@/components/sermons/SermonsClient";
import { getSermons } from "@/lib/supabase/queries";

export const metadata = { title: "Sermons | Enoch's Outpost Ministry" };

export default async function SermonsPage() {
  const sermons = await getSermons();

  return (
    <>
      <section className="relative overflow-hidden bg-outpost-gradient pt-40 pb-20 text-center text-white">
        <div className="absolute inset-0 bg-outpost-radiance" />
        <div className="section relative">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-outpost-light">
            Sermon Library
          </span>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Messages that Point to Jesus
          </h1>
        </div>
      </section>

      <section className="section !pt-16">
        <SermonsClient sermons={sermons} />
      </section>
    </>
  );
}
