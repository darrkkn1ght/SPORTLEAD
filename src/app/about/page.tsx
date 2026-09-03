import { Metadata } from 'next';
import WhoWeAre from '@/components/about/WhoWeAre';
import OurMandate from '@/components/about/OurMandate';
import OurApproach from '@/components/about/OurApproach';
import Leadership from '@/components/about/Leadership';
import ValuesStandards from '@/components/about/ValuesStandards';

export const metadata: Metadata = {
  title: 'About | SportLead Africa',
  description: 'Learn about SportLead Africa, our mandate, approach, leadership, and the values that guide our work in African sport development.',
};

export default function AboutPage() {
  return (
    <main>
      <WhoWeAre />
      <OurMandate />
      <OurApproach />
      <Leadership />
      <ValuesStandards />
    </main>
  );
}
