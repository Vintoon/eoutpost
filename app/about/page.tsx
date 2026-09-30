import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { Compass, Eye, HeartHandshake, ScrollText, Star, Users } from "lucide-react";
import { getSiteContent } from "@/lib/supabase/queries";

const values = [
  { icon: HeartHandshake, title: "Christ-Centered", text: "Everything we do points back to Jesus and His soon return." },
  { icon: ScrollText, title: "Scripture-Rooted", text: "We test all teaching against the whole counsel of God's Word." },
  { icon: Users, title: "Family-Focused", text: "We believe the home is the first mission field." },
  { icon: Star, title: "Excellence", text: "We offer our best in service, teaching, and hospitality." },
];

export default async function AboutPage() {
  const content = await getSiteContent();
  return (
    <>
      <section className="relative overflow-hidden bg-outpost-gradient pt-40 pb-24 text-center text-white">
        <div className="absolute inset-0 bg-outpost-radiance" />
        <div className="section relative">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-outpost-light">
            Our Story
          </span>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Walking with God, Looking unto Jesus
          </h1>
        </div>
      </section>

      <section className="section grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 shadow-glass-lg">
          <Image
            src="https://images.unsplash.com/photo-1445633629932-0029acc44e88?q=80&w=1200&auto=format&fit=crop"
            alt="Congregation in worship"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="mb-4 font-display text-3xl font-bold text-outpost-navy">
            Our Story
          </h2>
          <p className="mb-4 text-outpost-navy/70">{content.about_history}</p>
          <p className="text-outpost-navy/70">
            Named after Enoch, who &ldquo;walked with God&rdquo;, our outpost is a
            place of refuge and preparation — a community anchored in
            Scripture and looking expectantly for the soon coming of Jesus.
          </p>
        </div>
      </section>

      <section className="bg-outpost-sand/40">
        <div className="section grid grid-cols-1 gap-8 sm:grid-cols-2">
          <GlassCard className="flex flex-col items-start">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-outpost-gradient text-white">
              <Compass size={22} />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-outpost-navy">Our Mission</h3>
            <p className="text-sm text-outpost-navy/70">{content.about_mission}</p>
          </GlassCard>
          <GlassCard delay={0.1} className="flex flex-col items-start">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-outpost-gradient text-white">
              <Eye size={22} />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-outpost-navy">Our Vision</h3>
            <p className="text-sm text-outpost-navy/70">{content.about_vision}</p>
          </GlassCard>
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="What We Believe" title="Our Core Values" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <GlassCard key={v.title} delay={i * 0.1} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-outpost-gradient text-white">
                <v.icon size={20} />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-outpost-navy">
                {v.title}
              </h3>
              <p className="text-sm text-outpost-navy/70">{v.text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="glass rounded-xl2 p-10 text-center sm:p-16">
          <ScrollText size={32} className="mx-auto mb-6 text-outpost-blue" />
          <p className="mx-auto max-w-2xl font-display text-2xl italic leading-relaxed text-outpost-navy sm:text-3xl">
            &ldquo;And Enoch walked with God: and he was not; for God took him.&rdquo;
          </p>
          <p className="mt-4 text-sm font-medium uppercase tracking-widest text-outpost-blue">
            Genesis 5:24
          </p>
        </div>
      </section>
    </>
  );
}
