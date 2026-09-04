import React from 'react';
import { Container, SectionHeading } from '@/components/ui';
import { VALUES } from '@/lib/constants';

export default function ValuesStandards() {
  return (
    <section className="bg-warm-gray py-28 text-charcoal relative">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <span className="section-label">OUR PRINCIPLES</span>
            <SectionHeading 
              title="Values & Standards" 
              align="left"
            />
          </div>
          <p className="text-gray-500 text-lg leading-relaxed max-w-md lg:text-right">
            The standards that guide every engagement, recommendation and deliverable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((value, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-warm-border p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-brand-green/20 leading-none tracking-tighter select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-px bg-warm-border flex-1"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal group-hover:text-brand-green transition-colors">{value.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
