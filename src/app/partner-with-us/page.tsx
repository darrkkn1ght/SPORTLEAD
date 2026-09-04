import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Card, Button } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { PARTNER_ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Partner With Us | SportLead Africa',
  description: 'Explore partnership opportunities with SportLead Africa across project delivery, funding, technical expertise, and institutional collaboration.',
};

const CTA_MAP: Record<string, { text: string }> = {
  'Commission a Project': { text: 'Discuss a Project' },
  'Fund a Facility Project': { text: 'Contact Us' },
  'Join Our Expert Network': { text: 'Apply to Join' },
  'Institutional Partnerships': { text: 'Explore Partnerships' },
};

export default function PartnerWithUsPage() {
  return (
    <main className="bg-warm-white min-h-screen">
      <section className="bg-warm-gray py-24 md:py-32 pt-32 border-b border-warm-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-charcoal tracking-tight">Partner With Us</h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Clear routes for different types of collaboration — whether you need advisory services, want to fund infrastructure, contribute expertise, or build an institutional partnership.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PARTNER_ROUTES.map((route, index) => (
              <Card key={index} className="flex flex-col h-full" hoverable>
                <div className="w-14 h-14 bg-brand-green-muted text-brand-green rounded-xl flex items-center justify-center mb-8">
                  <Icon name={route.icon} className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold text-charcoal mb-4 tracking-tight">{route.title}</h3>
                <p className="text-gray-500 mb-10 flex-grow text-lg leading-relaxed">{route.description}</p>
                <div>
                  <Link href={route.href}>
                    <Button variant="primary" className="w-full sm:w-auto bg-brand-green text-white hover:bg-brand-green-light rounded-full px-8 font-bold">
                      {CTA_MAP[route.title]?.text || 'Get in Touch'}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
