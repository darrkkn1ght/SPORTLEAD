import React from 'react';
import { Container } from '@/components/ui';

export default function OurMandate() {
  return (
    <section className="bg-warm-white text-charcoal py-24 md:py-28 relative z-10 border-b border-warm-border">
      <Container>
        <div className="max-w-4xl mx-auto">
          <span className="section-label">WHY WE EXIST</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight mb-6">
            Addressing Institutional, Operational &amp; Physical Gaps
          </h2>
          <div className="w-16 h-1 bg-brand-green mb-10"></div>

          <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            <p className="font-medium text-charcoal">
              Sport development depends on more than talent. It also depends on functioning institutions, appropriate infrastructure, capable administration, sound governance, effective competition systems and projects that are properly designed and delivered.
            </p>
            <p>
              SportLead Africa exists to help address these institutional, operational and physical gaps. We work with clients and partners to understand what is not working, determine what is required and support the development of stronger systems for the delivery of sport.
            </p>
            <p>
              Our African focus does not assume that African sport operates in one uniform context. Each assignment should respond to the specific institutional, economic, regulatory and operational realities in which it sits.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
