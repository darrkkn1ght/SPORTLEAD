import type { Metadata } from 'next';
import Hero from "@/components/home/Hero";
import ServicePillars from "@/components/home/ServicePillars";
import WhoWeServe from "@/components/home/WhoWeServe";
import WhySportLead from "@/components/home/WhySportLead";
import ClosingCTA from "@/components/home/ClosingCTA";

export const metadata: Metadata = {
  title: 'SportLead Africa | Building Better Sport Systems Across Africa',
  description:
    'SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport sector projects.',
  alternates: {
    canonical: 'https://sportleadafrica.com',
  },
  openGraph: {
    title: 'SportLead Africa | Building Better Sport Systems Across Africa',
    description:
      'SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport sector projects.',
    url: 'https://sportleadafrica.com',
    siteName: 'SportLead Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'SportLead Africa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportLead Africa | Building Better Sport Systems Across Africa',
    description:
      'SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport sector projects.',
    images: ['/images/og-image.jpg'],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <ServicePillars />
      <WhoWeServe />
      <WhySportLead />
      <ClosingCTA />
    </main>
  );
}
