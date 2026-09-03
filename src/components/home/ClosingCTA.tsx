'use client';
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

export default function ClosingCTA() {
  return (
    <section className="py-32 bg-brand-navy-light relative overflow-hidden border-t border-white/5">
      <Container className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight mb-8">
            Have a sport-sector challenge, facility need or institutional project to develop?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-12">
            Let us discuss the problem and determine the right next step.
          </p>
          
          <div className="flex items-center gap-6">
            <Button variant="primary" size="lg" href="/discuss-a-project" className="px-10 py-6 text-lg font-bold tracking-wide bg-brand-gold text-brand-navy hover:bg-brand-gold-light border-none rounded-full">
              Discuss a Project
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
