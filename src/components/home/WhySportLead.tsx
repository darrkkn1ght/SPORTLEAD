'use client';
import { Container } from "@/components/ui/Container";
import { DIFFERENTIATORS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function WhySportLead() {
  return (
    <section className="py-28 bg-warm-white">
      <Container>
        <div className="text-center mb-20">
          <span className="section-label">
            Our Edge
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight mb-4">
            Why Partner With Us.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            What sets our advisory practice apart in the African sport sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {DIFFERENTIATORS.map((diff, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              key={index}
              className={`bg-white rounded-2xl border border-warm-border p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group ${index === DIFFERENTIATORS.length - 1 && DIFFERENTIATORS.length % 3 === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-green-muted flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-brand-green">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="h-px bg-warm-border flex-1"></div>
              </div>

              <h3 className="text-xl font-bold text-charcoal mb-3 tracking-tight group-hover:text-brand-green transition-colors">
                {diff.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {diff.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
