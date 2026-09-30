import { HandCoins, MessageCircle, CheckCircle2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { getDonationChannels } from "@/lib/supabase/queries";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Donate | Enoch's Outpost Ministry",
};

export default async function DonatePage() {
  const channels = await getDonationChannels();

  return (
    <>
      <section className="relative overflow-hidden bg-outpost-gradient pt-40 pb-20 text-center text-white">
        <div className="absolute inset-0 bg-outpost-radiance" />
        <div className="section relative">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-outpost-light">
            Give Cheerfully
          </span>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Donate to the Ministry
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/85">
            &ldquo;Every man according as he purposeth in his heart, so let
            him give; not grudgingly, or of necessity: for God loveth a
            cheerful giver.&rdquo; — 2 Corinthians 9:7
          </p>
        </div>
      </section>

      <section className="section !pt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {channels.map((c, i) => (
            <GlassCard key={c.id} delay={i * 0.08} className="flex flex-col items-start">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-outpost-gradient text-white">
                <HandCoins size={20} />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-outpost-navy">
                {c.method}
              </h3>
              <p className="mb-3 text-sm font-medium text-outpost-navy/80">{c.details}</p>
              {c.instructions && (
                <p className="flex items-start gap-2 text-sm leading-relaxed text-outpost-navy/60">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-outpost-blue" />
                  {c.instructions}
                </p>
              )}
            </GlassCard>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-lg text-sm text-outpost-navy/70">
            Prefer to arrange your gift directly, or have a question about giving?
            Reach us on WhatsApp or email and we&apos;ll gladly assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={siteConfig.whatsappLink} size="md">
              <MessageCircle size={18} /> Message Us on WhatsApp
            </Button>
            <Button href={`mailto:${siteConfig.email}`} variant="outline" size="md">
              Email {siteConfig.email}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
