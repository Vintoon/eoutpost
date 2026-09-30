import SectionTitle from "@/components/ui/SectionTitle";
import MinistryCard from "@/components/cards/MinistryCard";
import { HeartPulse, ScrollText, Baby, HomeIcon } from "lucide-react";
import { siteContentDefaults } from "@/lib/site-content-defaults";

interface MinistryAreasProps {
  blurbs?: Partial<
    Pick<
      typeof siteContentDefaults,
      "ministry_health_blurb" | "ministry_prophecy_blurb" | "ministry_children_blurb" | "ministry_family_blurb"
    >
  >;
}

export default function MinistryAreas({ blurbs }: MinistryAreasProps) {
  const ministryAreas = [
    {
      icon: HeartPulse,
      title: "Health Ministry",
      description: blurbs?.ministry_health_blurb ?? siteContentDefaults.ministry_health_blurb,
      href: "/resources?tab=articles",
    },
    {
      icon: ScrollText,
      title: "Prophecy Ministry",
      description: blurbs?.ministry_prophecy_blurb ?? siteContentDefaults.ministry_prophecy_blurb,
      href: "/resources?tab=studies",
    },
    {
      icon: Baby,
      title: "Children's Ministry",
      description: blurbs?.ministry_children_blurb ?? siteContentDefaults.ministry_children_blurb,
      href: "/gallery",
    },
    {
      icon: HomeIcon,
      title: "Family Life Ministry",
      description: blurbs?.ministry_family_blurb ?? siteContentDefaults.ministry_family_blurb,
      href: "/resources?tab=articles",
    },
  ];

  return (
    <section className="section">
      <SectionTitle
        eyebrow="What We Do"
        title="Our Ministry Areas"
        description="Four pillars through which we serve the body of Christ and the wider community."
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {ministryAreas.map((area, i) => (
          <MinistryCard key={area.title} {...area} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
