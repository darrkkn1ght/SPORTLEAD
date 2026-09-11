import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { MapPin, Globe, LinkedIn, ExternalLink, Shield, CheckCircle } from '@/components/ui/Icon';
import { ArrowLeft, Clock } from 'lucide-react';
import { getExpertById } from '@/lib/expert-network';

interface PageProps {
  params: {
    expertId: string;
  };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const expert = getExpertById(params.expertId);
  if (!expert) {
    return {
      title: 'Expert Profile | SportLead Africa',
      description: 'SportLead Africa Expert Network specialist profile.',
    };
  }

  return {
    title: `${expert.fullName} — ${expert.primaryDiscipline} | SportLead Africa Expert Network`,
    description: Array.isArray(expert.shortBio) ? expert.shortBio[0] : expert.shortBio,
  };
}

export default function ExpertProfilePage({ params }: PageProps) {
  const expert = getExpertById(params.expertId);

  // Empty / Pending state when profile is not yet published in the registry
  if (!expert) {
    return (
      <main className="bg-warm-white min-h-screen pt-32 pb-24 text-charcoal">
        <Container>
          <div className="max-w-2xl mx-auto text-center bg-white p-12 sm:p-16 rounded-3xl border border-warm-border shadow-card">
            <div className="w-16 h-16 rounded-2xl bg-brand-green-muted text-brand-green flex items-center justify-center mx-auto mb-6">
              <Clock size={32} />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-brand-green block mb-2">
              EXPERT NETWORK REGISTRY
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-charcoal tracking-tight mb-4">
              Profile in Onboarding
            </h1>

            <p className="text-base text-gray-500 leading-relaxed mb-8">
              The expert profile for reference ID <code className="bg-warm-gray px-2 py-0.5 rounded text-charcoal font-mono text-xs">{params.expertId}</code> is currently undergoing governance vetting or is pending publication. Approved specialists are added to the public directory on a rolling basis.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/expert-network">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-3 border-warm-border text-charcoal hover:border-brand-green text-sm font-semibold inline-flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  <span>Return to Expert Network</span>
                </Button>
              </Link>
              <Link href="/discuss-a-project">
                <Button
                  variant="primary"
                  className="bg-brand-green text-white hover:bg-brand-green-light rounded-full px-8 py-3 text-sm font-bold shadow-sm"
                >
                  Discuss a Project Team
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  const bioParagraphs = Array.isArray(expert.shortBio) ? expert.shortBio : [expert.shortBio];
  const initials = expert.fullName
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <main className="bg-warm-white min-h-screen text-charcoal pb-28">
      {/* Top Breadcrumbs & Back Bar */}
      <section className="bg-warm-gray pt-32 pb-12 border-b border-warm-border">
        <Container>
          <div className="mb-6">
            <Link
              href="/expert-network"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-brand-green transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Expert Network</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Portrait Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              {expert.photograph ? (
                <img
                  src={expert.photograph}
                  alt={expert.fullName}
                  className="w-48 sm:w-56 lg:w-full aspect-[4/5] rounded-3xl object-cover border border-warm-border shadow-card mb-6"
                />
              ) : (
                <div className="w-48 sm:w-56 lg:w-full aspect-[4/5] rounded-3xl bg-gradient-to-br from-charcoal-light to-charcoal text-brand-gold font-bold text-4xl flex items-center justify-center border border-warm-border shadow-card mb-6">
                  {initials || 'SL'}
                </div>
              )}

              {/* Public Routing Advisory Note (Strictly No Direct Phone/Email) */}
              <div className="w-full bg-white rounded-2xl p-5 border border-warm-border shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-brand-green text-xs font-bold uppercase tracking-wider">
                  <Shield size={16} />
                  <span>Institutional Engagement</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Direct personal contact coordinates are omitted for confidentiality. All technical assignments and consultations are commissioned directly through SportLead Africa.
                </p>
                <Link href={`/discuss-a-project?service=${encodeURIComponent(expert.primaryDiscipline)}`} className="block pt-1">
                  <Button
                    variant="primary"
                    className="w-full justify-center bg-brand-green text-white hover:bg-brand-green-light rounded-full text-xs font-bold py-2.5 shadow-sm"
                  >
                    Enquire via SportLead Africa
                  </Button>
                </Link>
              </div>
            </div>

            {/* Header Details Column */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-green bg-brand-green-muted px-3 py-1.5 rounded-full inline-block mb-3">
                  {expert.primaryDiscipline}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-2">
                  {expert.fullName}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 font-medium">
                  {expert.currentRole}
                  {expert.currentOrganisation ? ` • ${expert.currentOrganisation}` : ''}
                </p>
              </div>

              {/* Meta Coordinates */}
              <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 pt-2 border-t border-warm-border">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-brand-green shrink-0" />
                  <span>Base: {expert.country}</span>
                </div>

                {expert.languages && expert.languages.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Globe size={16} className="text-brand-green shrink-0" />
                    <span>Languages: {expert.languages.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* External Professional Links (No Personal Phone/Email) */}
              {(expert.linkedin || expert.website) && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {expert.website && (
                    <a
                      href={expert.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-brand-green transition-colors bg-white px-4 py-2 rounded-full border border-warm-border shadow-sm"
                    >
                      <Globe size={15} className="text-brand-green" />
                      <span>Professional Website / Portfolio</span>
                      <ExternalLink size={13} className="text-gray-400" />
                    </a>
                  )}
                  {expert.linkedin && (
                    <a
                      href={expert.linkedin}
                      target={expert.linkedin === '#' ? undefined : '_blank'}
                      rel={expert.linkedin === '#' ? undefined : 'noopener noreferrer'}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-brand-green transition-colors bg-white px-4 py-2 rounded-full border border-warm-border shadow-sm"
                    >
                      <LinkedIn size={15} className="text-brand-green" />
                      <span>LinkedIn Profile</span>
                      <ExternalLink size={13} className="text-gray-400" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Profile Details Sections */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            {/* Main Content (Biography & Project Experience) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Short Biography */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-charcoal mb-4">
                  Professional Biography
                </h2>
                <div className="space-y-4 text-base text-gray-600 leading-relaxed">
                  {bioParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Selected Relevant Project Experience */}
              {expert.relevantProjectExperience && expert.relevantProjectExperience.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-charcoal mb-4">
                    Selected Relevant Project Experience
                  </h2>
                  <div className="space-y-3">
                    {expert.relevantProjectExperience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl border border-warm-border p-5 shadow-sm flex items-start gap-3.5"
                      >
                        <CheckCircle size={18} className="text-brand-green mt-0.5 shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Details (Qualifications, Areas of Expertise, Regions) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Areas of Expertise */}
              <div className="bg-white rounded-3xl border border-warm-border p-6 sm:p-7 shadow-card">
                <h3 className="text-base font-bold text-charcoal uppercase tracking-wider mb-4">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {expert.areasOfExpertise.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-warm-gray text-charcoal px-3 py-1.5 rounded-lg border border-warm-border font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Academic Qualifications */}
              <div className="bg-white rounded-3xl border border-warm-border p-6 sm:p-7 shadow-card">
                <h3 className="text-base font-bold text-charcoal uppercase tracking-wider mb-4">
                  Academic Qualifications
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                  {expert.academicQualifications.map((acad, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 shrink-0" />
                      <span>{acad}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Professional Qualifications & Registrations */}
              {expert.professionalQualifications && expert.professionalQualifications.length > 0 && (
                <div className="bg-white rounded-3xl border border-warm-border p-6 sm:p-7 shadow-card">
                  <h3 className="text-base font-bold text-charcoal uppercase tracking-wider mb-4">
                    Professional Registrations
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                    {expert.professionalQualifications.map((prof, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                        <span>{prof}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Countries / Regions of Practice */}
              {expert.regionsOfPractice && expert.regionsOfPractice.length > 0 && (
                <div className="bg-white rounded-3xl border border-warm-border p-6 sm:p-7 shadow-card">
                  <h3 className="text-base font-bold text-charcoal uppercase tracking-wider mb-4">
                    Regions of Practice
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {expert.regionsOfPractice.map((reg, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-brand-green-muted text-brand-green font-semibold px-2.5 py-1 rounded-md"
                      >
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
