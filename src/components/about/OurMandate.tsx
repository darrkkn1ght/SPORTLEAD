import React from 'react';
import { Container } from '@/components/ui';

export default function OurMandate() {
  return (
    <section className="bg-warm-white text-charcoal py-24 relative z-10">
      <Container>
        <span className="section-label">OUR MANDATE</span>

        <div className="grid lg:grid-cols-12 gap-12 mt-12">
          <div className="lg:col-span-8 lg:col-start-3 space-y-8">
            <blockquote className="border-l-4 border-brand-green pl-8 py-2 my-12">
              <p className="text-3xl lg:text-4xl font-medium text-charcoal leading-snug">
                "SportLead Africa exists to help close these institutional, operational and physical gaps."
              </p>
            </blockquote>

            <div className="prose prose-lg text-gray-500 max-w-none space-y-6">
              <p>
                The African sport sector holds immense potential, yet it continues to face significant structural challenges.
              </p>
              <p>
                Our mandate is clear: we partner with visionary leaders, institutions, and stakeholders to build robust frameworks, implement sustainable practices, and drive measurable progress across the continent's sporting landscape.
              </p>
              <p>
                By addressing these fundamental gaps, we aim to unlock the true economic and social value of sport in Africa.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
