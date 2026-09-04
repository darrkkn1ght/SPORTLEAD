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
          
          <div className="lg:w-2/3 prose prose-lg max-w-none space-y-6 text-gray-300">
            <p className="text-2xl text-white font-medium leading-relaxed">
              SportLead Africa is an advisory firm dedicated to advancing the sport industry in Africa.
            </p>
            <p>
              We provide strategic advisory, capacity building, and project management services to sport organisations, governments, and private sector entities.
            </p>
            <p>
              Our mission is to help our clients navigate the complex landscape of the African sport industry and achieve their objectives through tailored, data-driven solutions.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
