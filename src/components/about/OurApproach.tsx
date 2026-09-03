import React from 'react';
import { Container, SectionHeading } from '@/components/ui';
import { APPROACH_STEPS } from '@/lib/constants';

export default function OurApproach() {
  return (
    <section className="bg-brand-off-white text-brand-navy py-24 relative overflow-hidden">
      <div className="absolute inset-0 diagonal-stripe opacity-30 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="mb-16">
          <span className="section-label">OUR METHOD</span>
          <SectionHeading 
            title="Our Approach" 
            subtitle="A structured method applied to every assignment."
            align="left"
            className="text-brand-navy"
          />
        </div>

        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-[4.5rem] left-0 right-0 h-px bg-brand-gold/30 border-t border-dashed border-brand-gold/50" />
          
          {/* Mobile connecting line */}
          <div className="md:hidden absolute top-0 bottom-0 left-8 w-px bg-brand-gold/30 border-l border-dashed border-brand-gold/50" />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4">
            {APPROACH_STEPS.map((step, index) => (
              <div key={index} className="relative flex md:block items-start gap-6 md:gap-0 animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                
                <div className="md:mb-8 bg-brand-off-white relative z-10 w-16 h-16 md:w-auto md:h-auto shrink-0 flex items-center justify-center">
                  <span className="numbered-label text-4xl md:text-6xl lg:text-7xl !text-brand-navy/10 font-bold block md:inline">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="pt-2 md:pt-0">
                  <h3 className="text-xl font-bold mb-3 text-brand-navy">{step.title}</h3>
                  <p className="text-brand-grey text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
