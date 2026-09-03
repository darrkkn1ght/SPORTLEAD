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
    <main className="bg-brand-navy min-h-screen">
      <section className="bg-brand-navy-light py-24 md:py-32 pt-32 border-b border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">Insights</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Research, analysis and evidence shaping the future of African sport.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-brand-navy-light p-12 md:p-16 rounded-3xl shadow-lg border border-white/5 text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Insights in Development</h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                SportLead Africa Insights is in development. This section will publish original sector assessments, practical analysis, research, reports and evidence on the institutions, infrastructure and systems shaping African sport.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-widest mb-8 text-center">Planned Content Categories</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {CATEGORIES.map((cat, i) => (
                  <Badge key={i} variant="outline" className="text-base py-2.5 px-6 border-white/20 text-gray-300 hover:border-brand-gold hover:text-brand-gold transition-colors cursor-default">
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
