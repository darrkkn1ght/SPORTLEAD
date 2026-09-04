'use client';
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-charcoal overflow-hidden flex items-center pt-24 pb-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-charcoal/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2936&auto=format&fit=crop"
          alt="Professional Sport Planning"
          className="w-full h-full object-cover opacity-30 grayscale"
        />
      </div>

      <Container className="relative z-10 w-full mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl"
        >
          <h1 className="text-white font-bold leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8">
            Building Better Sport Systems Through Infrastructure, Governance, Strategy & Institutional Development Across <span className="text-brand-green-light">Africa.</span>
          </h1>

          <div className="w-24 h-1 bg-brand-green rounded-full mb-8"></div>

          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-12 max-w-4xl">
            SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport-sector projects.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" href="/discuss-a-project" className="font-bold tracking-wide bg-brand-green text-white hover:bg-brand-green-light border-none shadow-lg rounded-full px-8">
              Discuss a Project
            </Button>
            <Button variant="outline-light" size="lg" href="/services" className="font-semibold tracking-wide rounded-full px-8">
              Explore Our Services
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
