import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { ExpertCard } from '@/components/expert-network/ExpertCard';
import { APPROVED_EXPERTS, EXPERT_DISCIPLINE_CATEGORIES } from '@/lib/expert-network';

export const metadata: Metadata = {
  title: 'SportLead Africa Expert Network | Specialists in African Sport Development',
  description:
    'Our Expert Network brings together qualified specialists across the disciplines required to plan, strengthen and deliver sport sector projects across Africa.',
};

export default function ExpertNetworkPage() {
  const hasExperts = APPROVED_EXPERTS.length > 0;

  return (
    <main className="bg-warm-white min-h-screen text-charcoal">
      {/* 1. Hero Section */}
      <section className="bg-warm-gray pt-32 pb-20 md:pb-28 border-b border-warm-border">
        <Container>
          <div className="max-w-4xl">
            <span className="section-label">SPECIALIST NETWORK</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal mb-6">
              SportLead Africa Expert Network
            </h1>
            <div className="w-20 h-1 bg-brand-green rounded-full mb-8" />
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Our Expert Network brings together qualified specialists across the disciplines required to plan, strengthen and deliver sport sector projects. Experts are engaged according to the needs of each assignment, allowing SportLead Africa to assemble multidisciplinary teams around specific institutional, infrastructure and project challenges.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Status Note Banner */}
      <section className="py-8 bg-brand-green-muted/60 border-b border-brand-green/10">
        <Container>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-3 h-3 rounded-full bg-brand-green shrink-0 animate-pulse" />
            <p className="text-xs sm:text-sm font-medium text-brand-green-dark leading-relaxed">
              <strong>Network Notice:</strong> The network is currently being developed. Approved expert profiles will be added as specialists complete our review and onboarding process.
            </p>
          </div>
        </Container>
      </section>

      {/* 3. Core Disciplines / Directory Section */}
      <section className="py-20 md:py-28 border-b border-warm-border">
        <Container>
          <div className="text-center md:text-left mb-16">
            <span className="section-label">PRACTICE DISCIPLINES</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal tracking-tight mb-4">
              Disciplines We Assemble
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl">
              We coordinate technical specialists across core sport-sector capability domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {EXPERT_DISCIPLINE_CATEGORIES.map((discipline, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-warm-border p-7 shadow-sm hover:shadow-card transition-shadow flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-green-muted text-brand-green font-bold text-xs flex items-center justify-center shrink-0">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-base font-bold text-charcoal mb-1">
                    {discipline}
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">
                    Technical Fellows &amp; Specialists
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Expert Profiles Grid (Architecture ready for approved profiles) */}
          {hasExperts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {APPROVED_EXPERTS.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-warm-border p-10 md:p-14 text-center max-w-3xl mx-auto shadow-card">
              <div className="w-14 h-14 rounded-2xl bg-brand-green-muted text-brand-green flex items-center justify-center mx-auto mb-5">
                <Icon name="Users" className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">
                Specialist Profiles in Onboarding
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-lg mx-auto mb-6">
                Technical specialists, facility auditors, architects, governance advisors and project managers across Africa are currently completing credential verification. Directory profiles will display here.
              </p>
              <Link href="/expert-network/apply">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-2.5 border-brand-green text-brand-green hover:bg-brand-green-muted text-xs font-bold"
                >
                  Submit Expert Credentials
                </Button>
              </Link>
            </div>
          )}
        </Container>
      </section>

      {/* 4. Closing CTA Section */}
      <section className="py-24 md:py-28 bg-charcoal text-white relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-green-light font-bold block mb-4">
              JOIN THE NETWORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Apply to Join the SportLead Africa Expert Network
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Are you a qualified professional whose expertise can contribute to stronger sport systems, facilities, institutions or projects across Africa? Apply to join the SportLead Africa Expert Network.
            </p>
            <div>
              <Link href="/expert-network/apply">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-brand-green text-white hover:bg-brand-green-light rounded-full px-10 py-4 font-bold text-sm sm:text-base shadow-lg"
                >
                  Apply to Join the Expert Network
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
