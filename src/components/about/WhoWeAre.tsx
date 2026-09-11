import React from 'react';
import { Container } from '@/components/ui';

export default function WhoWeAre() {
  return (
    <section className="bg-charcoal pt-32 pb-24 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <div className="lg:w-1/3 shrink-0">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-green-light font-bold block mb-4">WHO WE ARE</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8">
              Driving <br />
              <span className="text-gradient">Excellence</span>
            </h1>
            <div className="w-16 h-1 bg-brand-green mb-8"></div>
          </div>

          <div className="lg:w-2/3 space-y-6 text-gray-300">
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              SportLead Africa is a sport management, infrastructure and institutional advisory organisation focused on strengthening the systems through which sport is planned, governed, organised and delivered across Africa.
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              We work with sport organisations, governments, educational institutions and private sector partners to plan and improve facilities, strengthen governance and administration, develop institutional strategy, organise effective competitions and deliver complex sport sector projects.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
