import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { SERVICE_DETAILS, SERVICE_SLUGS, type ServiceDetail } from '@/lib/service-details';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = SERVICE_DETAILS[params.slug];
  if (!service) return { title: 'Service Not Found | SportLead Africa' };

  return {
    title: `${service.title} | SportLead Africa`,
    description: service.heroIntro,
    openGraph: {
      title: `${service.title} | SportLead Africa`,
      description: service.heroIntro,
      url: `https://sportleadafrica.com/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = SERVICE_DETAILS[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-warm-white min-h-screen text-charcoal">
      {/* 1. Hero Section */}
      <section className="bg-warm-gray pt-32 pb-16 md:pb-24 border-b border-warm-border">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <Link href="/" className="hover:text-brand-green transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-brand-green transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-brand-green truncate">{service.title}</span>
          </nav>

          <div className="max-w-4xl">
            <span className="section-label">PRACTICE AREA</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal mb-6">
              {service.title}
            </h1>
            <div className="w-20 h-1 bg-brand-green rounded-full mb-8" />
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {service.heroIntro}
            </p>
          </div>

          {/* Hero Image Frame */}
          <div className="mt-12 rounded-3xl overflow-hidden border border-warm-border shadow-card aspect-[16/8] sm:aspect-[21/9] relative bg-charcoal">
            <img
              src={service.heroImage}
              alt={service.heroImageAlt}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent pointer-events-none" />
          </div>
        </Container>
      </section>

      {/* 2. The Problem This Service Addresses */}
      <section className="py-20 md:py-24 border-b border-warm-border">
        <Container>
          <div className="max-w-4xl mx-auto">
            <span className="section-label">DIAGNOSIS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal tracking-tight mb-8">
              The Problem This Service Addresses
            </h2>
            <div className="bg-white rounded-3xl border border-warm-border p-8 md:p-12 shadow-card border-l-4 border-l-brand-green">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                {service.problem}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 & 4. Scope of Work & Typical Deliverables */}
      <section className="py-20 md:py-24 bg-warm-gray/40 border-b border-warm-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Scope of Work */}
            <div className="bg-white rounded-3xl border border-warm-border p-8 sm:p-10 shadow-card flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-green-muted flex items-center justify-center text-brand-green shrink-0">
                  <Icon name="Layers" className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                  Scope of Work
                </h3>
              </div>
              <ul className="space-y-3.5 flex-grow">
                {service.scopeOfWork.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-brand-green mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Typical Deliverables */}
            <div className="bg-white rounded-3xl border border-warm-border p-8 sm:p-10 shadow-card flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-green-muted flex items-center justify-center text-brand-green shrink-0">
                  <Icon name="ClipboardCheck" className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                  Typical Deliverables
                </h3>
              </div>
              <ul className="space-y-3.5 flex-grow">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-brand-gold mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. How We Work */}
      <section className="py-20 md:py-28 border-b border-warm-border">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center md:text-left mb-16">
              <span className="section-label">PROCESS</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal tracking-tight mb-4">
                How We Work
              </h2>
              <p className="text-gray-500 text-base sm:text-lg">
                Structured stages applied across the duration of this assignment.
              </p>
            </div>

            <div className="space-y-4">
              {service.howWeWork.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-warm-border p-6 sm:p-7 shadow-sm hover:shadow-card transition-shadow flex items-start gap-5 group"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-green-muted flex items-center justify-center text-brand-green font-bold text-sm shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="pt-2">
                    <p className="text-base sm:text-lg font-semibold text-charcoal leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 6 & 7. Who This Is For & Expertise We Assemble */}
      <section className="py-20 md:py-24 bg-warm-gray/40 border-b border-warm-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 max-w-6xl mx-auto items-start">
            {/* Who This Is For */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-warm-border p-8 sm:p-10 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-green-muted flex items-center justify-center text-brand-green shrink-0">
                  <Icon name="Users" className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                  Who This Is For
                </h3>
              </div>
              <ul className="space-y-3">
                {service.whoThisIsFor.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expertise We May Assemble */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-warm-border p-8 sm:p-10 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-green-muted flex items-center justify-center text-brand-green shrink-0">
                  <Icon name="Target" className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                  Expertise We May Assemble
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {service.expertiseWeAssemble}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. Closing CTA */}
      <section className="py-24 md:py-28 bg-charcoal text-white relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-green-light font-bold block mb-4">
              NEXT STEPS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Discuss This Service
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-10 max-w-xl mx-auto">
              Ready to scope requirements, request an audit, or discuss your organisation&apos;s project? Connect with our advisory practice.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={`/discuss-a-project?service=${service.slug}`}>
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-brand-green text-white hover:bg-brand-green-light rounded-full px-10 py-4 font-bold text-base shadow-lg"
                >
                  Discuss This Service
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline-light"
                  size="lg"
                  className="rounded-full px-8 py-4 font-semibold text-base"
                >
                  All Practice Areas
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
