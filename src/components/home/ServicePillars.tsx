'use client';
import { Container } from "@/components/ui/Container";
import { SERVICE_PILLARS } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicePillars() {
  const [firstService, ...remainingServices] = SERVICE_PILLARS;

  return (
    <section className="py-24 bg-brand-navy relative">
      <Container>
        <div className="mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-brand-gold font-bold block mb-4">
            Our Solutions
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Comprehensive Capabilities.
          </h2>
          <div className="w-24 h-[2px] bg-brand-gold mt-8"></div>
        </div>

        {firstService && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="bg-brand-navy-light rounded-2xl p-10 md:p-16 flex flex-col md:flex-row gap-10 items-start border border-white/5 shadow-lg hover:border-brand-gold/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center shadow-sm text-brand-gold border border-white/10">
                <Icon name={firstService.icon} className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  {firstService.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mb-8">
                  {firstService.description}
                </p>
                <Link href={firstService.href} className="inline-flex items-center font-semibold text-brand-gold hover:text-white transition-colors group">
                  <span className="uppercase tracking-wider text-sm">Explore Practice</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8 pt-4">
          {remainingServices.map((service, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={service.id} 
              className="bg-brand-navy-light rounded-2xl p-8 md:p-10 border border-white/5 shadow-lg hover:border-brand-gold/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shadow-sm text-brand-gold border border-white/10 mb-6">
                <Icon name={service.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                {service.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 flex-1">
                {service.description}
              </p>
              <Link href={service.href} className="inline-flex items-center text-white font-semibold text-sm hover:text-brand-gold transition-colors">
                <span className="uppercase tracking-wider">Explore</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
