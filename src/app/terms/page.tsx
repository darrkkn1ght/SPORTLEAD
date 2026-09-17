import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { SITE_NAME, SITE_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Use | Legal Terms',
  description:
    'Terms of use governing access to and use of the SportLead Africa advisory website and platforms.',
  alternates: {
    canonical: 'https://sportleadafrica.com/terms',
  },
  openGraph: {
    title: 'Terms of Use | Legal Terms | SportLead Africa',
    description:
      'Terms of use governing access to and use of the SportLead Africa advisory website and platforms.',
    url: 'https://sportleadafrica.com/terms',
    siteName: 'SportLead Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'SportLead Africa Terms of Use' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Use | Legal Terms | SportLead Africa',
    description:
      'Terms of use governing access to and use of the SportLead Africa advisory website and platforms.',
    images: ['/images/og-image.jpg'],
  },
};

export default function TermsPage() {
  return (
    <main className="bg-warm-white min-h-screen text-charcoal">
      {/* Header */}
      <section className="bg-warm-gray pt-32 pb-16 border-b border-warm-border">
        <Container>
          <div className="max-w-4xl">
            <span className="section-label">LEGAL &amp; COMPLIANCE</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
              Terms of Use
            </h1>
            <div className="w-16 h-1 bg-brand-green rounded-full mb-6" />
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
              Terms and conditions governing access to and use of the SportLead Africa website, digital briefs, and expert applications.
            </p>
          </div>
        </Container>
      </section>


      {/* Main Content */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or browsing this website ({SITE_NAME}), submitting an advisory inquiry, or applying to the Expert Network, you acknowledge and agree to these general terms of use.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">2. Advisory Disclaimer</h2>
              <p>
                Materials, articles, service descriptions, and commentary published on this website are provided for informational and preliminary scoping purposes only. They do not constitute formal engineering, architectural, financial, or legal advice until formal engagement terms and technical scopes of work are executed in writing.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">3. Intellectual Property</h2>
              <p>
                All original methodologies, service pillars, institutional assessments, logos, graphics, and written content published on this website are the intellectual property of {SITE_NAME} unless otherwise credited. Reproduction or republication without prior written consent is prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">4. Expert Network Status &amp; Representation</h2>
              <p>
                Admission to or membership in the SportLead Africa Expert Network represents credential recognition for project team consideration. It does not establish an employer-employee relationship, agency authority, or guarantee commercial assignments. Expert Network specialists may not represent or bind {SITE_NAME} without explicit written authorisation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">5. Inquiries &amp; Modifications</h2>
              <p>
                We reserve the right to amend these terms in accordance with evolving operational and legal guidelines. For legal questions regarding website terms, contact{' '}
                <a href={`mailto:${SITE_EMAIL}`} className="text-brand-green font-semibold hover:underline">
                  {SITE_EMAIL}
                </a>.
              </p>
            </div>

            <div className="pt-8 border-t border-warm-border text-xs text-gray-400">
              Last updated: September 2026 • Document Version: 1.0
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
