'use client';
import { Container } from "@/components/ui/Container";
import { AUDIENCES } from "@/lib/constants";
import { motion } from "framer-motion";

export default function WhoWeServe() {
  return (
    <section className="py-24 md:py-32 bg-warm-gray relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-5 sticky top-24">
            <span className="section-label">
              Who We Serve
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 tracking-tight">
              Empowering the Sports Ecosystem
            </h2>
            <div className="w-16 h-[2px] bg-brand-green mb-8"></div>
            <p className="text-gray-500 text-lg leading-relaxed">
              We partner with forward-thinking organizations across the continent, driving institutional growth and sustainable impact in the sports sector.
            </p>
          </div>
          
          <div className="lg:col-span-7 flex flex-col">
            {AUDIENCES.map((audience, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={index} 
                className="py-6 border-b border-warm-border flex items-center group hover:bg-white/60 transition-colors px-4 -mx-4 rounded-xl cursor-default"
              >
                <span className="text-brand-green font-semibold text-sm mr-6 w-6">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-xl md:text-2xl text-charcoal font-medium group-hover:translate-x-2 transition-transform">
                  {audience.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
