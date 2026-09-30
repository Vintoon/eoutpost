import GalleryClient from "@/components/gallery/GalleryClient";
import { getGalleryImages } from "@/lib/supabase/queries";

export const metadata = { title: "Gallery | Enoch's Outpost Ministry" };

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <section className="relative overflow-hidden bg-outpost-gradient pt-40 pb-20 text-center text-white">
        <div className="absolute inset-0 bg-outpost-radiance" />
        <div className="section relative">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-outpost-light">
            Moments of Ministry
          </span>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Gallery
          </h1>
        </div>
      </section>

      <section className="section !pt-16">
        <GalleryClient images={images} />
      </section>
    </>
  );
}
