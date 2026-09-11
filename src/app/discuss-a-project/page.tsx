import { Suspense } from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui';
import ProjectInquiryForm from '@/components/forms/ProjectInquiryForm';

export const metadata: Metadata = {
  title: 'Discuss a Project | SportLead Africa',
  description: 'Submit your sport-sector challenge, facility need or institutional project for review by our technical team.',
};

export default function DiscussProjectPage() {
  return (
    <main className="bg-warm-white min-h-screen">
      <section className="bg-warm-gray py-24 pt-32 border-b border-warm-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-charcoal tracking-tight">Discuss a Project</h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Tell us about your sport-sector challenge, facility need or institutional project. We'll review your inquiry and determine the right next step.
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
