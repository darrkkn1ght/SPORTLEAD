import React from 'react';
import { Container } from '@/components/ui';
import { APPROACH_STEPS } from '@/lib/constants';

export default function OurApproach() {
  return (
    <section className="bg-warm-white text-charcoal py-28 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="text-center mb-20">
          <span className="section-label">OUR METHOD</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">Our Approach</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">A structured method applied to every assignment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPROACH_STEPS.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl border border-warm-border p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Step number */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-green-muted flex items-center justify-center">
                  <span className="text-sm font-bold text-brand-green">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                {index < APPROACH_STEPS.length - 1 && (
                  <div className="h-px bg-warm-border flex-1"></div>
                )}
              </div>

              <h3 className="text-xl font-bold mb-3 text-charcoal group-hover:text-brand-green transition-colors">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
