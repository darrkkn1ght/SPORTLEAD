import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Card, Button } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { SERVICE_PILLARS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Services | SportLead Africa',
  description: 'Comprehensive sport management, infrastructure and institutional advisory services.',
};

export default function ServicesPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <section className="bg-brand-navy-light py-24 md:py-32 pt-32 border-b border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">Our Services</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We provide strategic guidance and technical expertise to build stronger sports institutions and infrastructure across Africa.
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
                  <div className="w-12 h-12 bg-white/5 border border-white/10 text-brand-gold rounded-xl flex items-center justify-center mb-6">
                    <Icon name={service.icon as any} className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                </div>
                <div className="pt-6 mt-auto border-t border-white/10">
                  <Link href="#" className="text-brand-gold font-semibold hover:text-white inline-flex items-center transition-colors group">
                    Learn more <Icon name="ArrowRight" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-24 text-center max-w-2xl mx-auto bg-brand-navy-light p-12 rounded-3xl border border-white/5">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Ready to advance your project?</h2>
            <Link href="/discuss-a-project">
              <Button variant="primary" size="lg" className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light rounded-full px-8 font-bold">Discuss a Project</Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
