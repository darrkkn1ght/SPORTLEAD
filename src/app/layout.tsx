import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: {
    default: 'SportLead Africa | Sport Management, Infrastructure & Institutional Advisory',
    template: '%s | SportLead Africa',
  },
  description: 'SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport-sector projects across Africa.',
  keywords: ['SportLead Africa', 'Sport Management', 'Africa Sport', 'Sport Infrastructure', 'Institutional Advisory', 'Sport Governance', 'Sport Consulting'],
  openGraph: {
    title: 'SportLead Africa | Sport Management, Infrastructure & Institutional Advisory',
    description: 'SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport-sector projects across Africa.',
    url: 'https://sportleadafrica.com',
    siteName: 'SportLead Africa',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportLead Africa',
    description: 'SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport-sector projects across Africa.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased text-charcoal bg-warm-white flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
