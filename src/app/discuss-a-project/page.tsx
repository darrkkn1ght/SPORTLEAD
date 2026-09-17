import { Suspense } from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui';
import ProjectInquiryForm from '@/components/forms/ProjectInquiryForm';

export const metadata: Metadata = {
  title: 'Discuss a Project | Project Enquiry',
  description:
    'Tell us what you are trying to develop, improve or solve. We will review the information and determine the most appropriate next conversation.',
  alternates: {
    canonical: 'https://sportleadafrica.com/discuss-a-project',
  },
  openGraph: {
    title: 'Discuss a Project | Project Enquiry | SportLead Africa',
    description:
      'Tell us what you are trying to develop, improve or solve. We will review the information and determine the most appropriate next conversation.',
    url: 'https://sportleadafrica.com/discuss-a-project',
    siteName: 'SportLead Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Discuss a Project — SportLead Africa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discuss a Project | Project Enquiry | SportLead Africa',
    description:
      'Tell us what you are trying to develop, improve or solve. We will review the information and determine the most appropriate next conversation.',
    images: ['/images/og-image.jpg'],
  },
};

export default function DiscussProjectPage() {
  return (
    <main className="bg-warm-white min-h-screen">
      <section className="bg-warm-gray py-24 pt-32 border-b border-warm-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-charcoal tracking-tight">Discuss a Project</h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Tell us what you are trying to develop, improve or solve. We will review the information and determine the most appropriate next conversation.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="max-w-4xl">
          <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading form...</div>}>
            <ProjectInquiryForm />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}
