import { LucideIcon } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface MinistryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  delay?: number;
}

export default function MinistryCard({
  icon: Icon,
  title,
  description,
  href,
  delay,
}: MinistryCardProps) {
  return (
    <GlassCard delay={delay} className="flex flex-col items-start">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-outpost-gradient text-white shadow-glass">
        <Icon size={26} />
      </div>
      <h3 className="mb-2 font-display text-xl font-semibold text-outpost-navy">
        {title}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-outpost-navy/70">
        {description}
      </p>
      <Button href={href} variant="ghost" size="sm" className="!px-0 text-outpost-blue">
        Learn More <ArrowRight size={16} />
      </Button>
    </GlassCard>
  );
}
