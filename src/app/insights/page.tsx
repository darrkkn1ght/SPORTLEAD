import { Metadata } from 'next';
import { Container, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Insights | SportLead Africa',
  description: 'Original sector assessments, practical analysis, research, and reports on African sport.',
};

const CATEGORIES = [
  'Reports & Assessments',
  'Infrastructure',
  'Governance & Administration',
  'Strategy & Institutions',
  'Competitions & Events',
  'Sport-Sector Commentary'
];

export default function InsightsPage() {
  return (
    <main className="bg-warm-white min-h-screen">
      <section className="bg-warm-gray py-24 md:py-32 pt-32 border-b border-warm-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-charcoal tracking-tight">Insights</h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Research, analysis and evidence shaping the future of African sport.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-12 md:p-16 rounded-3xl shadow-card border border-warm-border text-center mb-16">
              <h2 className="text-3xl font-bold text-charcoal mb-6 tracking-tight">Insights in Development</h2>
              <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
                SportLead Africa Insights is in development. This section will publish original sector assessments, practical analysis, research, reports and evidence on the institutions, infrastructure and systems shaping African sport.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-8 text-center">Planned Content Categories</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {CATEGORIES.map((cat, i) => (
                  <Badge key={i} variant="outline" className="text-base py-2.5 px-6 border-gray-300 text-gray-600 hover:border-brand-green hover:text-brand-green transition-colors cursor-default">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
