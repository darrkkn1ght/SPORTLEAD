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

        {/* Process Flow: 6 connected steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {APPROACH_STEPS.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl border border-warm-border p-7 shadow-sm hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 group flex flex-col"
            >
              {/* Step indicator header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-green bg-brand-green-muted px-3 py-1 rounded-full">
                  Step 0{index + 1}
                </span>
                <span className="text-2xl font-bold text-charcoal/10 font-mono select-none">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2 text-charcoal group-hover:text-brand-green transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
