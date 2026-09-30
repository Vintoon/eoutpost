import SectionTitle from "@/components/ui/SectionTitle";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { getTestimonials } from "@/lib/supabase/queries";

export default async function TestimonialsSection() {
  const items = await getTestimonials();
  if (items.length === 0) return null;

  return (
    <section className="relative bg-outpost-sand/40">
      <div className="section">
        <SectionTitle
          eyebrow="Changed Lives"
          title="Testimonials"
          description="Stories from those whose lives have been touched through this ministry."
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <TestimonialCard key={item.id} item={item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
