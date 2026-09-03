import { Metadata } from 'next';
import { Container } from '@/components/ui';
import ProjectInquiryForm from '@/components/forms/ProjectInquiryForm';

export const metadata: Metadata = {
  title: 'Discuss a Project | SportLead Africa',
  description: 'Submit your sport-sector challenge, facility need or institutional project for review by our technical team.',
};

export default function DiscussProjectPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <section className="bg-brand-navy-light py-24 pt-32 border-b border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">Discuss a Project</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Tell us about your sport-sector challenge, facility need or institutional project. We'll review your inquiry and determine the right next step.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="max-w-4xl">
          <ProjectInquiryForm />
        </Container>
      </section>
    </main>
  );
}
