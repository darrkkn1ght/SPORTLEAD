import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Expert Network | SportLead Africa',
  description: 'The SportLead Africa Expert Network brings together qualified professionals across sport infrastructure, governance, and strategy.',
};

export default function ExpertNetworkPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <section className="bg-brand-navy-light py-24 md:py-32 pt-32 border-b border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">Expert Network</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              A multidisciplinary collective of specialists driving sport development across Africa.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center bg-brand-navy-light p-16 rounded-3xl shadow-lg border border-white/5">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Network in Development</h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              The SportLead Africa Expert Network brings together qualified professionals across sport infrastructure, governance, administration, strategy, competition management and related disciplines. Public expert profiles will be published as the network develops.
            </p>
            <Link href="/partner-with-us">
              <Button variant="outline" size="lg" className="border-brand-gold text-brand-gold hover:bg-white/5 rounded-full px-8 transition-colors">Join Our Expert Network</Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
