import React from 'react';
import { Container } from '@/components/ui';
import { User } from '@/components/ui/Icon';

export default function Leadership() {
  return (
    <section className="bg-warm-white py-28 relative z-0 text-charcoal">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-24">
          <div className="lg:w-1/3 shrink-0">
            <span className="section-label">LEADERSHIP</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Guiding Vision</h2>
            <div className="w-16 h-[2px] bg-brand-green mt-8"></div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl border border-warm-border p-10 md:p-14 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-card">
              <div className="w-24 h-24 rounded-full bg-warm-gray border border-warm-border flex items-center justify-center shrink-0">
                <User className="text-gray-400 w-10 h-10" />
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2 text-charcoal">Founder & Principal Consultant</h3>
                <p className="text-brand-green font-semibold uppercase tracking-wider text-sm mb-6">Profile Forthcoming</p>
                <div className="w-12 h-px bg-warm-border mb-6"></div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Leadership appointments and profiles will be published as the founding team is confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
