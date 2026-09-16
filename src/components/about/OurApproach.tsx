import React from 'react';
import { Container } from '@/components/ui';
import { APPROACH_STEPS } from '@/lib/constants';

export default function OurApproach() {
  return (
    <section className="bg-warm-gray/40 text-charcoal py-24 md:py-28 relative overflow-hidden border-b border-warm-border">
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">OUR METHOD</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Our Approach
          </h2>
          <p className="text-gray-500 text-base sm:text-lg">
            A structured method applied to every assignment.
          </p>
        </div>

        {/* Clean Linear Process */}
        <div className="max-w-4xl mx-auto space-y-4">
          {APPROACH_STEPS.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl border border-warm-border p-6 sm:p-7 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group"
            >
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 rounded-xl bg-brand-green-muted text-brand-green font-bold text-sm flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors shrink-0">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold text-charcoal sm:w-36 group-hover:text-brand-green transition-colors shrink-0">
                  {step.title}
                </h3>
              </div>
              <div className="hidden sm:block w-px h-10 bg-warm-border shrink-0" />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
