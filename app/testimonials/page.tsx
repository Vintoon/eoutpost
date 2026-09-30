import SectionTitle from "@/components/ui/SectionTitle";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { getTestimonials } from "@/lib/supabase/queries";

export const metadata = { title: "Testimonials | Enoch's Outpost Ministry" };

export default async function TestimonialsPage() {
  const items = await getTestimonials();
  return (
    <section className="section !pt-40">
      <SectionTitle
        eyebrow="Changed Lives"
        title="Testimonials"
        description="Stories from those whose lives have been touched through this ministry."
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <TestimonialCard key={item.id} item={item} delay={i * 0.08} />
        ))}
      </div>
      {items.length === 0 && (
        <p className="py-16 text-center text-outpost-navy/60">No testimonials have been added yet.</p>
      )}
    </section>
  );
}
