import { Metadata } from 'next';
import { Container } from '@/components/ui';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact SportLead Africa | Inquiries & Advisory',
  description:
    'Contact us for general enquiries, service questions or to be directed to the appropriate project or partnership pathway.',
  alternates: {
    canonical: 'https://sportleadafrica.com/contact',
  },
  openGraph: {
    title: 'Contact SportLead Africa | Inquiries & Advisory',
    description:
      'Contact us for general enquiries, service questions or to be directed to the appropriate project or partnership pathway.',
    url: 'https://sportleadafrica.com/contact',
    siteName: 'SportLead Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Contact SportLead Africa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact SportLead Africa | Inquiries & Advisory',
    description:
      'Contact us for general enquiries, service questions or to be directed to the appropriate project or partnership pathway.',
    images: ['/images/og-image.jpg'],
  },
};

export default function ContactPage() {
  return (
    <main className="bg-warm-white min-h-screen pt-32 pb-24">
      <Container>
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-tight">Contact SportLead Africa</h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            Contact us for general enquiries, service questions or to be directed to the appropriate project or partnership pathway.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <ContactInfo />
          </div>
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
