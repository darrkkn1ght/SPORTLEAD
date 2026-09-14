import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights | SportLead Africa',
  description: 'Research, analysis and evidence shaping the future of African sport.',
};

const CATEGORIES = [
  'Reports & Assessments',
  'Infrastructure',
  'Governance & Administration',
  'Strategy & Institutions',
  'Competitions & Events',
  'Sport-Sector Commentary',
];

export default function InsightsPage() {
  return (
    <main className="bg-warm-white min-h-screen text-charcoal">
      {/* Hero Section */}
      <section className="bg-warm-gray pt-32 pb-20 md:pb-28 border-b border-warm-border">
        <Container>
          <div className="max-w-4xl">
            <span className="section-label">EVIDENCE &amp; ANALYSIS</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal mb-6">
              Insights
            </h1>
            <div className="w-20 h-1 bg-brand-green rounded-full mb-8" />
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Research, analysis and evidence shaping the future of African sport.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Status Card */}
            <div className="bg-white p-10 sm:p-14 rounded-3xl shadow-card border border-warm-border text-center mb-16">
              <div className="w-16 h-16 bg-brand-green-muted text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <BookOpen className="w-8 h-8" />
              </div>

              <div className="inline-flex items-center gap-2 bg-brand-green-muted/80 text-brand-green font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Publication Section in Development
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-5 tracking-tight">
                Editorial &amp; Research Hub
              </h2>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-4">
                SportLead Africa Insights is in development. This section will publish original sector assessments, practical analysis, research, reports and evidence on the institutions, infrastructure and systems shaping African sport.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
                Our first publications will be added as SportLead Africa&apos;s research and sector assessment work develops.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/discuss-a-project">
                  <Button
                    variant="primary"
                    className="rounded-full px-7 py-3 bg-brand-green hover:bg-brand-green-light font-bold text-white text-xs sm:text-sm shadow-sm"
                  >
                    Commission an Assessment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-7 py-3 border-warm-border hover:bg-gray-50 font-bold text-charcoal text-xs sm:text-sm"
                  >
                    Contact Advisory Team
                  </Button>
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="text-center">
              <span className="section-label block mb-3">RESEARCH DOMAINS</span>
              <h3 className="text-xl font-bold text-charcoal mb-8">Planned Content Categories</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {CATEGORIES.map((cat, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-full bg-white border border-warm-border text-gray-700 shadow-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
