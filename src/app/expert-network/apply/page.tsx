import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import ExpertApplicationForm from '@/components/forms/ExpertApplicationForm';
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apply to Join the Expert Network | SportLead Africa',
  description:
    'Submit your professional credentials and experience to join the SportLead Africa Expert Network across sport infrastructure, auditing, governance, strategy, and project management.',
};

export default function ExpertApplyPage() {
  return (
    <main className="bg-warm-white min-h-screen text-charcoal pb-24">
      {/* 1. Page Header */}
      <section className="bg-warm-gray pt-32 pb-16 border-b border-warm-border">
        <Container>
          <div className="max-w-4xl">
            <Link
              href="/expert-network"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-green hover:underline mb-6"
            >
              <ArrowLeft size={14} />
              Back to Expert Network Directory
            </Link>

            <span className="section-label block">FELLOWSHIP &amp; TECHNICAL ADVISORY</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
              Apply to Join the SportLead Africa Expert Network
            </h1>
            <div className="w-16 h-1 bg-brand-green rounded-full mb-6" />
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
              We welcome qualified technical specialists, facility auditors, architects, governance advisors, competition managers, and project executives interested in contributing to sport sector assignments across Africa.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Key Criteria Badges */}
      <section className="py-8 bg-white border-b border-warm-border">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green-muted text-brand-green flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal">Multidisciplinary Focus</h4>
                <p className="text-xs text-gray-500">6 technical practice disciplines</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green-muted text-brand-green flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal">Rigorous Vetting</h4>
                <p className="text-xs text-gray-500">Peer and credential verification</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green-muted text-brand-green flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal">Rolling Admissions</h4>
                <p className="text-xs text-gray-500">Evaluated on quarterly cadence</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green-muted text-brand-green flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal">Continental Impact</h4>
                <p className="text-xs text-gray-500">Pan-African project mandates</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Multi-step Form Application */}
      <section className="pt-12 md:pt-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ExpertApplicationForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
