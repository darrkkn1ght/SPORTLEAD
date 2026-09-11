import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Card, Button } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { PARTNER_ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Partner With Us | SportLead Africa',
  description:
    'Explore partnership opportunities with SportLead Africa across project delivery, funding, technical expertise, and institutional collaboration.',
};

const CTA_MAP: Record<string, { text: string; href?: string }> = {
  'Commission a Project': { text: 'Discuss a Project', href: '/discuss-a-project' },
  'Fund a Facility Project': { text: 'Contact Us', href: '/contact?subject=Fund+a+Facility+Project' },
  'Join Our Expert Network': { text: 'Apply to Join', href: '/expert-network/apply' },
  'Institutional Partnerships': { text: 'Explore Partnerships', href: '/contact?subject=Institutional+Partnership' },
};

const ANCHOR_MAP: Record<string, string> = {
  'Commission a Project': 'commission',
  'Fund a Facility Project': 'fund',
  'Join Our Expert Network': 'expert-network',
  'Institutional Partnerships': 'institutional',
};

export default function PartnerWithUsPage() {
  return (
    <main className="bg-warm-white min-h-screen text-charcoal">
      <section className="bg-warm-gray pt-32 pb-20 md:pb-28 border-b border-warm-border">
        <Container>
          <div className="max-w-4xl">
            <span className="section-label">COLLABORATION MODELS</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal mb-6">
              Partner With Us
            </h1>
            <div className="w-20 h-1 bg-brand-green rounded-full mb-8" />
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Clear routes for different types of collaboration — whether you need advisory services, want to fund infrastructure, contribute expertise, or build an institutional partnership.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PARTNER_ROUTES.map((route, index) => {
              const anchorId = ANCHOR_MAP[route.title];
              const ctaConfig = CTA_MAP[route.title];
              const destinationHref = ctaConfig?.href || route.href;

              return (
                <div
                  key={index}
                  id={anchorId}
                  className="scroll-mt-36 flex flex-col"
                >
                  <Card className="flex flex-col h-full bg-white border border-warm-border rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-card transition-shadow" hoverable>
                    <div className="w-14 h-14 bg-brand-green-muted text-brand-green rounded-2xl flex items-center justify-center mb-6">
                      <Icon name={route.icon} className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4 tracking-tight">
                      {route.title}
                    </h3>
                    <p className="text-gray-600 mb-8 flex-grow text-base sm:text-lg leading-relaxed">
                      {route.description}
                    </p>
                    <div>
                      <Link href={destinationHref}>
                        <Button
                          variant="primary"
                          className="w-full sm:w-auto bg-brand-green text-white hover:bg-brand-green-light rounded-full px-8 py-3 font-bold text-sm shadow-sm"
                        >
                          {ctaConfig?.text || 'Get in Touch'}
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
