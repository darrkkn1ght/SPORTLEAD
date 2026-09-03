'use client';
import { Container } from "@/components/ui/Container";
import { DIFFERENTIATORS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function WhySportLead() {
  return (
    <section className="py-24 bg-brand-navy-light">
      <Container>
        <div className="mb-20 max-w-2xl">
          <span className="text-sm uppercase tracking-[0.2em] text-brand-gold font-bold block mb-4">
            Our Edge
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Why Partner With Us.
          </h2>
          <div className="w-24 h-[2px] bg-brand-gold mt-8"></div>
        </div>

        <div className="flex flex-col space-y-12 lg:space-y-16 max-w-5xl">
          {DIFFERENTIATORS.map((diff, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index} 
              className="relative flex flex-col md:flex-row gap-6 md:gap-12 items-start group pb-12 lg:pb-16 border-b border-white/10 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center gap-4 md:w-48 shrink-0">
                <span className="text-sm font-semibold text-brand-gold uppercase tracking-widest">0{index + 1}</span>
                <div className="h-px bg-brand-gold/30 flex-1"></div>
              </div>
              
              <div className="flex-1 pt-0">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-brand-gold transition-colors">
                  {diff.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                  {diff.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
