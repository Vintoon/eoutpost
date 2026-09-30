import SectionTitle from "@/components/ui/SectionTitle";
import HealthCard from "@/components/cards/HealthCard";
import { Button } from "@/components/ui/Button";
import { getHealthTips } from "@/lib/supabase/queries";

export default async function HealthSection() {
  const tips = await getHealthTips();
  if (tips.length === 0) return null;

  return (
    <section className="relative bg-outpost-sand/40">
      <div className="section">
        <SectionTitle
          eyebrow="A Temple for the Holy Spirit"
          title="Health Ministry"
          description="Biblical principles of nutrition, natural remedies, and lifestyle wellness."
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tips.slice(0, 3).map((item, i) => (
            <HealthCard key={item.id} item={item} delay={i * 0.1} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/health" variant="outline" size="sm">
            View All Health Resources
          </Button>
        </div>
      </div>
    </section>
  );
}
