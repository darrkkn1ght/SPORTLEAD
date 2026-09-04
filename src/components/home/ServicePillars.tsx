'use client';
import { Container } from "@/components/ui/Container";
import { SERVICE_PILLARS } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicePillars() {
  return (
    <section className="py-28 bg-warm-white relative">
      <Container>
        {/* Section header: split layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <span className="section-label">
              Our Solutions
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight">
              Comprehensive<br />Capabilities.
            </h2>
          </div>
          <p className="text-gray-500 text-lg leading-relaxed max-w-md lg:text-right">
            Six practice areas built around the real needs of African sport organisations, facilities and systems.
          </p>
        </div>

        {/* Bento grid: first row 2 larger cards, second row 2, third row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {SERVICE_PILLARS.map((service, index) => {
            // First two cards span 7 and 5 cols, next two 5 and 7, last two 6 and 6
            const colSpans = [
              'md:col-span-7',
              'md:col-span-5',
              'md:col-span-5',
              'md:col-span-7',
              'md:col-span-6',
              'md:col-span-6',
            ];
            const span = colSpans[index] || 'md:col-span-6';

            return (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                key={service.id}
                className={`${span} group`}
              >
                <Link href={service.href} className="block h-full">
                  <div className="relative bg-white rounded-2xl border border-warm-border p-8 md:p-10 h-full shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-green/0 group-hover:bg-brand-green transition-colors duration-300" />

                    {/* Number + Icon row */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-xl bg-brand-green-muted flex items-center justify-center text-brand-green">
                        <Icon name={service.icon} className="w-6 h-6" />
                      </div>
                      <span className="text-5xl font-bold text-charcoal/[0.06] leading-none tracking-tighter select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-bold text-charcoal tracking-tight mb-3 group-hover:text-brand-green transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Explore link */}
                    <span className="inline-flex items-center text-brand-green font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="uppercase tracking-wider">Explore</span>
                      <span className="ml-2">→</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
