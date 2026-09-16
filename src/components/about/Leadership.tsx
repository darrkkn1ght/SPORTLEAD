import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui';
import { Globe, LinkedIn, ExternalLink } from '@/components/ui/Icon';
import type { LeaderProfile } from '@/types';

// Founder data matching approved client copy verbatim
const FOUNDER_DATA: LeaderProfile = {
  name: 'Dr. Joshua A. Oparachukwu',
  role: 'Founder, SportLead Africa',
  titleLine: 'Founder, SportLead Africa │ Performance Strategist │ Applied Performance Scientist │ Sport Administration Expert',
  photo: '/images/leadership/joshua-oparachukwu.webp',
  photoAlt: 'Dr. Joshua A. Oparachukwu — Founder, SportLead Africa',
  bio: [
    'Dr. Joshua A. Oparachukwu is a Performance Strategist, Applied Performance Scientist and Sport Administration expert working at the intersection of human performance and the systems that shape sport. He is the Founder of SportLead Africa, where his focus is on sport management, governance, institutional development, infrastructure strategy and the development of stronger systems for the delivery of sport across Africa.',
    'His academic background spans Human Kinetics, the Sociology and Psychology of Sport, Performance Psychology and Sport Administration. This combination gives his work a dual perspective: an understanding of how people perform within sport environments and how the structures, leadership systems, governance arrangements and institutions around them influence what those environments are capable of producing.',
    'His work across research, teaching, consulting and sport has included performance psychology, athlete development, organisational decision making, sport governance and applied performance systems. Through SportLead Africa, he is extending this work toward the institutional questions that sit behind sustainable sport development, including how facilities are planned and improved, how organisations are governed and administered, how strategy is developed, and how multidisciplinary expertise can be coordinated around complex sport sector projects.',
    "Dr. Oparachukwu holds a Bachelor's degree in Human Kinetics, a Master's degree in the Sociology and Psychology of Sport, and a PhD in Performance Psychology from the University of Ibadan, Nigeria. He is also undertaking postgraduate study in Sport Administration.",
  ],
  qualifications: [
    'BSc Human Kinetics',
    'MSc Sociology and Psychology of Sport',
    'PhD Performance Psychology (University of Ibadan, Nigeria)',
  ],
  website: 'https://joshuaoparachukwu.com',
  linkedin: 'https://www.linkedin.com/in/dr-joshua-oparachukwu',
  areas: [
    'Sport Management & Strategy',
    'Applied Performance Systems',
    'Sport Governance & Administration',
    'Infrastructure Strategy',
  ],
  registrations: [],
};

/**
 * Reusable Leadership Card Component
 * Structured to support name, photograph, role, qualifications, short biography,
 * areas of responsibility, professional registrations, LinkedIn, and website.
 * Allows adding additional team profiles in future without redesign.
 */
export function LeadershipCard({ profile }: { profile: LeaderProfile }) {
  const bioParagraphs = Array.isArray(profile.bio) ? profile.bio : [profile.bio];
  const qualificationLines = Array.isArray(profile.qualifications)
    ? profile.qualifications
    : [profile.qualifications];

  return (
    <div className="bg-white rounded-3xl border border-warm-border p-8 md:p-12 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Portrait & Direct Coordinates */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Professional Portrait */}
          <div className="relative w-48 sm:w-56 lg:w-full aspect-[4/5] rounded-2xl overflow-hidden border border-warm-border shadow-sm mb-6">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={profile.photoAlt || profile.name}
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 100%"
                className="object-cover object-top"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-charcoal-light to-charcoal flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 rounded-full bg-brand-green/20 border-2 border-brand-green/40 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-brand-gold tracking-widest">
                    {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/70 text-center">
                  Professional Portrait
                </span>
              </div>
            )}
          </div>

          {/* Connect Links */}
          <div className="w-full space-y-2.5 pt-2 border-t border-warm-border/80">
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center lg:justify-start gap-2.5 text-sm font-semibold text-charcoal hover:text-brand-green transition-colors group"
              >
                <Globe size={16} className="text-brand-green shrink-0" />
                <span className="truncate">joshuaoparachukwu.com</span>
                <ExternalLink size={13} className="text-gray-400 group-hover:text-brand-green shrink-0" />
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target={profile.linkedin === '#' ? undefined : '_blank'}
                rel={profile.linkedin === '#' ? undefined : 'noopener noreferrer'}
                className="flex items-center justify-center lg:justify-start gap-2.5 text-sm font-semibold text-charcoal hover:text-brand-green transition-colors group"
                title={profile.linkedin === '#' ? 'LinkedIn profile forthcoming' : 'View LinkedIn Profile'}
              >
                <LinkedIn size={16} className="text-brand-green shrink-0" />
                <span>LinkedIn Profile</span>
                <ExternalLink size={13} className="text-gray-400 group-hover:text-brand-green shrink-0" />
              </a>
            )}
          </div>

          {/* Areas of Focus / Responsibility (if defined) */}
          {profile.areas && profile.areas.length > 0 && (
            <div className="w-full mt-6 pt-6 border-t border-warm-border/80 hidden sm:block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Focus Areas
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.areas.map((area, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-warm-gray text-charcoal px-2.5 py-1 rounded-md border border-warm-border font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Bio, Credentials & Qualifications */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header & Title */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green block mb-1">
              {profile.role}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mb-2">
              {profile.name}
            </h3>
            {profile.titleLine && (
              <p className="text-xs sm:text-sm font-medium text-gray-500 leading-relaxed">
                {profile.titleLine}
              </p>
            )}
          </div>

          <div className="w-12 h-0.5 bg-brand-green" />

          {/* Biography Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            {bioParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Qualifications & Academic Background Box */}
          <div className="bg-warm-gray/80 rounded-2xl p-5 sm:p-6 border border-warm-border space-y-2.5 mt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
              Qualifications &amp; Academic Credentials
            </span>
            {qualificationLines.map((q, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-medium">
                {q}
              </p>
            ))}
            {profile.registrations && profile.registrations.length > 0 && (
              <div className="pt-2 border-t border-warm-border flex flex-wrap gap-2">
                {profile.registrations.map((reg, idx) => (
                  <span key={idx} className="text-xs text-gray-500">
                    • {reg}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Leadership() {
  return (
    <section className="bg-warm-white py-24 md:py-28 relative z-0 text-charcoal border-b border-warm-border">
      <Container>
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          <span className="section-label">LEADERSHIP</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Practice Leadership
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl">
            Advisory capability grounded in performance science, institutional governance and sport administration.
          </p>
        </div>

        {/* Founder Profile */}
        <div className="max-w-5xl mx-auto mb-12">
          <LeadershipCard profile={FOUNDER_DATA} />
        </div>

        {/* Wider Leadership Note */}
        <div className="max-w-3xl mx-auto text-center bg-warm-gray rounded-2xl p-6 border border-warm-border">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Wider Leadership
          </p>
          <p className="text-sm text-gray-600">
            Additional leadership appointments and profiles will be published as the founding team develops.
          </p>
        </div>
      </Container>
    </section>
  );
}
