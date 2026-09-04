import { Metadata } from 'next';
import { Container } from '@/components/ui';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | SportLead Africa',
  description: 'Get in touch with SportLead Africa for inquiries, partnerships, or general information.',
};

export default function ContactPage() {
  return (
    <main className="bg-warm-white min-h-screen pt-32 pb-24">
      <Container>
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-tight">Get In Touch</h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            Whether you have a general inquiry or are looking to explore partnership opportunities, our team is ready to connect.
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
