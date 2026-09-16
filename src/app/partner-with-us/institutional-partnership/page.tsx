import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import InstitutionalPartnershipForm from '@/components/forms/InstitutionalPartnershipForm';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Institutional Partnerships | Partner With Us | SportLead Africa',
  description:
    'For universities, associations, federations, government institutions, NGOs, professional bodies and other organisations interested in longer term collaboration with SportLead Africa.',
  alternates: {
    canonical: 'https://sportleadafrica.com/partner-with-us/institutional-partnership',
  },
  openGraph: {
    title: 'Institutional Partnerships | Partner With Us | SportLead Africa',
    description:
      'For universities, associations, federations, government institutions, NGOs, professional bodies and other organisations interested in longer term collaboration with SportLead Africa.',
    url: 'https://sportleadafrica.com/partner-with-us/institutional-partnership',
    siteName: 'SportLead Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Institutional Partnerships — SportLead Africa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Institutional Partnerships | Partner With Us | SportLead Africa',
    description:
      'For universities, associations, federations, government institutions, NGOs, professional bodies and other organisations interested in longer term collaboration with SportLead Africa.',
    images: ['/images/og-image.jpg'],
  },
};

export default function InstitutionalPartnershipPage() {
  return (
    <main className="bg-warm-white min-h-screen text-charcoal pb-24">
      {/* Header */}
      <section className="bg-warm-gray pt-32 pb-16 border-b border-warm-border">
        <Container>
          <div className="max-w-4xl">
            <Link
              href="/partner-with-us"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-green hover:underline mb-6"
            >
              <ArrowLeft size={14} />
              Back to Partner With Us
            </Link>

            <span className="section-label block">INSTITUTIONAL COLLABORATION</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
              Institutional Partnerships
            </h1>
            <div className="w-16 h-1 bg-brand-green rounded-full mb-6" />
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
              For universities, associations, federations, government institutions, NGOs, professional bodies and other organisations interested in longer term collaboration with SportLead Africa.
            </p>
          </div>
        </Container>
      </section>

      {/* Form Container */}
      <section className="pt-12 md:pt-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <InstitutionalPartnershipForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
