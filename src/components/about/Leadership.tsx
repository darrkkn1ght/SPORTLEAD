import React from 'react';
import { Container } from '@/components/ui';
import { User } from '@/components/ui/Icon';

export default function Leadership() {
  return (
    <section className="bg-brand-navy bg-noise py-24 relative section-angle-top z-0 text-white">
      <Container>
        <div className="mb-16">
          <span className="section-label">LEADERSHIP</span>
          <h2 className="text-4xl font-bold">Guiding Vision</h2>
        </div>

        <div className="max-w-2xl border border-brand-gold/20 bg-brand-navy-light/50 backdrop-blur-sm p-12 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-brand-navy border border-brand-gold/30 flex items-center justify-center mb-4">
            <User className="text-brand-gold/50 w-8 h-8" />
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-2">Founder & Principal Consultant</h3>
            <p className="text-brand-gold font-medium uppercase tracking-wider text-sm">Profile Forthcoming</p>
          </div>
          
          <div className="w-12 h-px bg-brand-gold/30"></div>
          
          <p className="text-gray-400 italic text-sm">
            Leadership appointments and profiles will be published as the founding team is confirmed.
          </p>
        </div>
      </Container>
    </section>
  );
}
