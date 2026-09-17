import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Card, Button } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { SERVICE_PILLARS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Services | Advisory, Infrastructure & Governance',
  description:
    'We provide advisory, technical and project support across the institutional, operational and physical systems through which sport is delivered.',
  alternates: {
    canonical: 'https://sportleadafrica.com/services',
  },
  openGraph: {
    title: 'Our Services | Advisory, Infrastructure & Governance | SportLead Africa',
    description:
      'We provide advisory, technical and project support across the institutional, operational and physical systems through which sport is delivered.',
    url: 'https://sportleadafrica.com/services',
    siteName: 'SportLead Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Our Services — SportLead Africa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Advisory, Infrastructure & Governance | SportLead Africa',
    description:
      'We provide advisory, technical and project support across the institutional, operational and physical systems through which sport is delivered.',
    images: ['/images/og-image.jpg'],
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="bg-warm-white min-h-screen">
      <section className="bg-warm-gray py-24 md:py-32 pt-32 border-b border-warm-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-charcoal tracking-tight">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We provide advisory, technical and project support across the institutional, operational and physical systems through which sport is delivered.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_PILLARS.map((service, index) => (
              <Card key={index} className="flex flex-col h-full" hoverable>
                <div className="flex-grow">
                  <div className="w-12 h-12 bg-brand-green-muted text-brand-green rounded-xl flex items-center justify-center mb-6">
                    <Icon name={service.icon as any} className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal mb-4 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-gray-500 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="pt-6 mt-auto border-t border-warm-border">
                  <Link
                    href={`/services/${service.id}`}
                    className="text-brand-green font-semibold hover:text-brand-green-light inline-flex items-center transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
                  >
                    Explore Service{' '}
                    <Icon
                      name="ArrowRight"
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-24 text-center max-w-2xl mx-auto bg-white p-12 rounded-3xl border border-warm-border shadow-card">
            <h2 className="text-3xl font-bold text-charcoal mb-6 tracking-tight">
              Ready to advance your project?
            </h2>
            <Link href="/discuss-a-project">
              <Button
                variant="primary"
                size="lg"
                className="bg-brand-green text-white hover:bg-brand-green-light rounded-full px-8 font-bold"
              >
                Discuss a Project
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
