import SectionTitle from "@/components/ui/SectionTitle";
import HealthCard from "@/components/cards/HealthCard";
import { getHealthTips } from "@/lib/supabase/queries";

export const metadata = { title: "Health Ministry | Enoch's Outpost Ministry" };

export default async function HealthPage() {
  const tips = await getHealthTips();
  return (
    <section className="section !pt-40">
      <SectionTitle
        eyebrow="A Temple for the Holy Spirit"
        title="Health Ministry"
        description="Biblical principles of nutrition, natural remedies, and lifestyle wellness."
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((item, i) => (
          <HealthCard key={item.id} item={item} delay={i * 0.08} />
        ))}
      </div>
      {tips.length === 0 && (
        <p className="py-16 text-center text-outpost-navy/60">No health resources have been added yet.</p>
      )}
    </section>
  );
}
