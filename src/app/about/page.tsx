import { Metadata } from 'next';
import WhoWeAre from '@/components/about/WhoWeAre';
import OurMandate from '@/components/about/OurMandate';
import OurApproach from '@/components/about/OurApproach';
import Leadership from '@/components/about/Leadership';
import ValuesStandards from '@/components/about/ValuesStandards';

export const metadata: Metadata = {
  title: 'About SportLead Africa | Advisory, Infrastructure & Governance',
  description:
    'SportLead Africa is a sport management, infrastructure and institutional advisory organisation focused on strengthening the systems through which sport is planned, governed, organised and delivered across Africa.',
  alternates: {
    canonical: 'https://sportleadafrica.com/about',
  },
  openGraph: {
    title: 'About SportLead Africa | Advisory, Infrastructure & Governance',
    description:
      'SportLead Africa is a sport management, infrastructure and institutional advisory organisation focused on strengthening the systems through which sport is planned, governed, organised and delivered across Africa.',
    url: 'https://sportleadafrica.com/about',
    siteName: 'SportLead Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'About SportLead Africa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SportLead Africa | Advisory, Infrastructure & Governance',
    description:
      'SportLead Africa is a sport management, infrastructure and institutional advisory organisation focused on strengthening the systems through which sport is planned, governed, organised and delivered across Africa.',
    images: ['/images/og-image.jpg'],
  },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <WhoWeAre />
      <OurMandate />
      <OurApproach />
      <Leadership />
      <ValuesStandards />
    </main>
  );
}
