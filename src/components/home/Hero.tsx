'use client';
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const STATS = [
  { value: "15+", label: "Countries" },
  { value: "50+", label: "Projects" },
  { value: "10", label: "Years" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-charcoal overflow-hidden flex items-center pt-24 pb-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-charcoal/80 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2936&auto=format&fit=crop"
          alt="Professional Sport Planning"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 grayscale"
        />
      </div>

      <Container className="relative z-10 w-full">
        {/* ── Two-column row: Headline (left) + Stat strip (right) ── */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-12 lg:gap-20">
          {/* ── Left column: Headline & Eyebrow ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:max-w-[640px] flex-shrink-0"
          >
            {/* Eyebrow */}
            <span
              className="inline-block text-brand-green-light font-semibold mb-5"
              style={{
                fontSize: "0.8125rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Pan-African Sport Development
            </span>

            {/* Headline — split weight */}
            <h1
              className="text-white"
              style={{
                fontSize: "clamp(1.75rem, 3vw + 1.2rem, 3.25rem)",
                lineHeight: 1.15,
              }}
            >
              <span className="font-extrabold">
                Building Better Sport Systems{" "}
              </span>
              <span className="font-normal" style={{ opacity: 0.82 }}>
                through Infrastructure, Governance, Strategy &amp; Institutional
                Development Across{" "}
                <span className="text-brand-green-light font-semibold">
                  Africa.
                </span>
              </span>
            </h1>
          </motion.div>

          {/* ── Right column: stat strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="w-full lg:w-auto flex flex-row lg:flex-col gap-8 lg:gap-10 justify-center items-center lg:items-start"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center lg:items-start"
              >
                <span
                  className="text-brand-green-light font-extrabold leading-none"
                  style={{ fontSize: "clamp(2rem, 2vw + 1rem, 2.75rem)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-white/50 font-medium mt-1"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Left column continuation: Accent bar, Paragraph, CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:max-w-[640px] mt-8"
        >
          {/* Accent bar */}
          <div className="w-16 h-[3px] bg-brand-green-light rounded-full mb-8" />

          {/* Supporting paragraph — de-emphasised */}
          <p
            className="font-light leading-relaxed mb-8 max-w-lg"
            style={{
              fontSize: "clamp(0.95rem, 0.5vw + 0.85rem, 1.125rem)",
              color: "rgba(255,255,255,0.68)",
            }}
          >
            SportLead Africa helps sport organisations plan better facilities,
            strengthen institutions, improve governance and administration,
            develop effective strategies and deliver complex sport-sector
            projects.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              href="/discuss-a-project"
              className="font-semibold tracking-wide bg-brand-green text-white hover:bg-brand-green-light border-2 border-brand-green hover:border-brand-green-light shadow-md rounded-full px-6 py-2.5 text-sm sm:text-base"
            >
              Discuss a Project
            </Button>
            <Button
              variant="outline-light"
              href="/services"
              className="font-semibold tracking-wide rounded-full px-6 py-2.5 text-sm sm:text-base border-2 border-white/30 text-white hover:border-white hover:bg-white/10"
            >
              Explore Our Services
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
