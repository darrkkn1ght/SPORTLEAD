import React from 'react';
import { Container, SectionHeading } from '@/components/ui';
import { VALUES } from '@/lib/constants';

export default function ValuesStandards() {
  return (
    <section className="bg-brand-navy bg-noise py-24 text-white relative">
      <Container>
        <div className="mb-20">
          <span className="section-label">OUR PRINCIPLES</span>
          <SectionHeading 
            title="Values & Standards" 
            align="left"
            light={true}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {VALUES.map((value, index) => (
            <div 
              key={index} 
              className={`relative border-t border-brand-gold/20 pt-8 animate-fadeInUp ${
                index % 2 !== 0 ? 'md:mt-24' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-6 items-start">
                <span className="text-5xl font-bold text-brand-gold/20 leading-none font-serif tracking-tighter shrink-0 mt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
