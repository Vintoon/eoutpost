import SectionTitle from "@/components/ui/SectionTitle";
import GardeningCard from "@/components/cards/GardeningCard";
import { Button } from "@/components/ui/Button";
import { getGardeningTips } from "@/lib/supabase/queries";

export default async function GardeningSection() {
  const tips = await getGardeningTips();
  if (tips.length === 0) return null;

  return (
    <section className="section">
      <SectionTitle
        eyebrow="Eden Living"
        title="Gardening Ministry"
        description="Practical, biblical self-reliance — growing your own food and natural remedies at home."
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tips.slice(0, 3).map((item, i) => (
          <GardeningCard key={item.id} item={item} delay={i * 0.1} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button href="/gardening" variant="outline" size="sm">
          View All Gardening Tips
        </Button>
      </div>
    </section>
  );
}
