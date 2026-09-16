import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnalyticsScript from '@/components/layout/AnalyticsScript';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL('https://sportleadafrica.com'),
  title: {
    default: 'SportLead Africa | Sport Management, Infrastructure & Institutional Advisory',
    template: '%s | SportLead Africa',
  },
  description:
    'SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport sector projects across Africa.',
  keywords: [
    'SportLead Africa',
    'Sport Management',
    'Africa Sport',
    'Sport Infrastructure',
    'Institutional Advisory',
    'Sport Governance',
    'Sport Consulting',
  ],
  openGraph: {
    title: 'SportLead Africa | Sport Management, Infrastructure & Institutional Advisory',
    description:
      'SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport sector projects across Africa.',
    url: 'https://sportleadafrica.com',
    siteName: 'SportLead Africa',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SportLead Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportLead Africa',
    description:
      'SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport sector projects across Africa.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
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
        {/* Accessible Skip-to-content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:bg-brand-green focus:text-white focus:font-bold focus:rounded-full focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <div id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          {children}
        </div>
        <Footer />
        <AnalyticsScript />
      </body>
    </html>
  );
}
