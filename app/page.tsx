import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import MinistryAreas from "@/components/home/MinistryAreas";
import NewsSection from "@/components/home/NewsSection";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import FeaturedResources from "@/components/home/FeaturedResources";
import HealthSection from "@/components/home/HealthSection";
import GardeningSection from "@/components/home/GardeningSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import DonateSection from "@/components/home/DonateSection";
import CTABanner from "@/components/cta/CTABanner";
import NewsletterCard from "@/components/cta/NewsletterCard";
import { getSiteContent } from "@/lib/supabase/queries";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <>
      <Hero title={content.hero_title} subtitle={content.hero_subtitle} />
      <AboutPreview mission={content.about_mission} vision={content.about_vision} history={content.about_history} />
      <MinistryAreas
        blurbs={{
          ministry_health_blurb: content.ministry_health_blurb,
          ministry_prophecy_blurb: content.ministry_prophecy_blurb,
          ministry_children_blurb: content.ministry_children_blurb,
          ministry_family_blurb: content.ministry_family_blurb,
        }}
      />
      <NewsSection />
      <UpcomingEvents />
      <FeaturedResources />
      <HealthSection />
      <GardeningSection />
      <TestimonialsSection />
      <DonateSection />
      <CTABanner />
      <div className="section !pt-0">
        <NewsletterCard />
      </div>
    </>
  );
}
