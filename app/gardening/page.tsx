import SectionTitle from "@/components/ui/SectionTitle";
import GardeningCard from "@/components/cards/GardeningCard";
import { getGardeningTips } from "@/lib/supabase/queries";

export const metadata = { title: "Gardening Ministry | Enoch's Outpost Ministry" };

export default async function GardeningPage() {
  const tips = await getGardeningTips();
  return (
    <section className="section !pt-40">
      <SectionTitle
        eyebrow="Eden Living"
        title="Gardening Ministry"
        description="Practical, biblical self-reliance — growing your own food and natural remedies at home."
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((item, i) => (
          <GardeningCard key={item.id} item={item} delay={i * 0.08} />
        ))}
      </div>
      {tips.length === 0 && (
        <p className="py-16 text-center text-outpost-navy/60">No gardening tips have been added yet.</p>
      )}
    </section>
  );
}
