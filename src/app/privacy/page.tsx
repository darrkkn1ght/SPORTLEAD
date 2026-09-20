import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { SITE_NAME, SITE_EMAIL, HEADQUARTERS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection',
  description:
    'Privacy Policy and data processing terms for SportLead Africa client and partner information.',
  alternates: {
    canonical: 'https://sportleadafrica.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Data Protection | SportLead Africa',
    description:
      'Privacy Policy and data processing terms for SportLead Africa client and partner information.',
    url: 'https://sportleadafrica.com/privacy',
    siteName: 'SportLead Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'SportLead Africa Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Data Protection | SportLead Africa',
    description:
      'Privacy Policy and data processing terms for SportLead Africa client and partner information.',
    images: ['/images/og-image.jpg'],
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-warm-white min-h-screen text-charcoal">
      {/* Header */}
      <section className="bg-warm-gray pt-32 pb-16 border-b border-warm-border">
        <Container>
          <div className="max-w-4xl">
            <span className="section-label">LEGAL &amp; COMPLIANCE</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
              Privacy Policy
            </h1>
            <div className="w-16 h-1 bg-brand-green rounded-full mb-6" />
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
              How SportLead Africa collects, processes, and protects personal and institutional information submitted through our advisory platforms.
            </p>
          </div>
        </Container>
      </section>


      {/* Main Policy Content */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">1. Scope and Controller</h2>
              <p>
                {SITE_NAME} (Headquarters: {HEADQUARTERS}) operates as an advisory, infrastructure planning, and sport management practice. This policy describes our handling of data provided via contact submissions, project inquiry briefs, and expert network credential applications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect information strictly necessary to assess project briefs and evaluate expert network applications:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li><strong>Identity &amp; Contact:</strong> Name, professional title, organisation, official email address, telephone/WhatsApp number, country, and base city.</li>
                <li><strong>Project Briefs:</strong> Organisational type, project location, facility specifications, stage of development, estimated budget envelopes, and scope descriptions.</li>
                <li><strong>Expert Network Applications:</strong> Curriculum vitae, academic qualifications, professional registrations, photograph, track record details, and professional references.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">3. Purpose and Legal Basis for Processing</h2>
              <p>
                We process your information exclusively to: (i) evaluate and respond to advisory mandate inquiries; (ii) vet expert credentials for potential inclusion in project assignment teams; (iii) deliver requested advisory reports; and (iv) meet applicable professional governance obligations. We do not sell, rent, or lease personal information to commercial third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">4. Confidentiality &amp; Institutional Data Protection</h2>
              <p>
                Project briefs and facility development parameters are treated under strict commercial confidentiality. Expert contact details, reference statements, and unpublished credentials are maintained in secure repositories accessible only to designated practice leadership.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">5. Expert Directory Publication</h2>
              <p>
                Approved Expert Network specialists consent to the publication of professional profile summaries (name, photograph, discipline, qualifications, and biography) on our directory. Personal contact numbers and direct personal email addresses are never published to public directory views.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-charcoal mb-3">6. Retention and Inquiries</h2>
              <p>
                Information is retained for the duration of the advisory relationship or credential review cycle. To request inspection, correction, or deletion of submitted details, please send an email to:{' '}
                <a href={`mailto:${SITE_EMAIL}`} className="text-brand-green font-semibold hover:underline">
                  {SITE_EMAIL}
                </a>
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
