import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import FacilityFundingForm from '@/components/forms/FacilityFundingForm';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fund a Facility Project | Partner With Us',
  description:
    'For companies, foundations, philanthropists, investors and other funders interested in supporting a defined sport facility or infrastructure project.',
  alternates: {
    canonical: 'https://sportleadafrica.com/partner-with-us/fund-a-facility',
  },
  openGraph: {
    title: 'Fund a Facility Project | Partner With Us | SportLead Africa',
    description:
      'For companies, foundations, philanthropists, investors and other funders interested in supporting a defined sport facility or infrastructure project.',
    url: 'https://sportleadafrica.com/partner-with-us/fund-a-facility',
    siteName: 'SportLead Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Fund a Facility Project — SportLead Africa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fund a Facility Project | Partner With Us | SportLead Africa',
    description:
      'For companies, foundations, philanthropists, investors and other funders interested in supporting a defined sport facility or infrastructure project.',
    images: ['/images/og-image.jpg'],
  },
};

export default function FundAFacilityPage() {
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

            <span className="section-label block">FACILITY INVESTMENT &amp; CAPITAL</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
              Fund a Facility Project
            </h1>
            <div className="w-16 h-1 bg-brand-green rounded-full mb-6" />
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
              For companies, foundations, philanthropists, investors and other funders interested in supporting a defined sport facility or infrastructure project.
            </p>
          </div>
        </Container>
      </section>

      {/* Form Container */}
      <section className="pt-12 md:pt-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FacilityFundingForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
