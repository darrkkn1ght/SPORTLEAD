import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { HEADQUARTERS, SERVICE_PILLARS, SOCIAL_LINKS } from '@/lib/constants';
import { AfricaEmblem } from './AfricaEmblem';
import { LinkedIn, Instagram, Twitter, Facebook, Globe, MapPin, Mail } from '@/components/ui/Icon';

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LinkedIn,
  Instagram,
  Twitter,
  Facebook,
  Globe,
};

const OFFICIAL_EMAIL = 'inquiries@sportleadafrica.com';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Social links must remain strictly hidden until official production URLs are supplied (never render '#')
  const validSocialLinks = SOCIAL_LINKS.filter(
    (l) => l.url && l.url.trim() !== '#' && l.url.trim().startsWith('http')
  );

  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 border-t border-white/10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Brand, Positioning Line & Coordinates */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg"
            >
              <span className="font-bold text-xl tracking-wider uppercase">
                SportLead Africa
              </span>
              <AfricaEmblem size={24} />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed font-normal">
              Building Better Sport Systems Across Africa.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <MapPin size={16} className="text-brand-green shrink-0" />
                <span>{HEADQUARTERS}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={16} className="text-brand-green shrink-0" />
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="hover:text-brand-green-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
                >
                  {OFFICIAL_EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links & Insights */}
          <div>
            <h3 className="font-semibold text-base mb-5 text-white tracking-wide uppercase text-xs text-brand-gold">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Expert Network', href: '/expert-network' },
                { label: 'Insights', href: '/insights' },
                { label: 'Partner With Us', href: '/partner-with-us' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-green-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="font-semibold text-base mb-5 text-white tracking-wide uppercase text-xs text-brand-gold">
              Services
            </h3>
            <ul className="space-y-3.5">
              {SERVICE_PILLARS.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-brand-green-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Partner With Us */}
          <div>
            <h3 className="font-semibold text-base mb-5 text-white tracking-wide uppercase text-xs text-brand-gold">
              Partner With Us
            </h3>
            <ul className="space-y-3.5">
              {[
                { label: 'Commission a Project', href: '/discuss-a-project' },
                { label: 'Fund a Facility Project', href: '/partner-with-us/fund-a-facility' },
                { label: 'Join Our Expert Network', href: '/expert-network/apply' },
                { label: 'Institutional Partnerships', href: '/partner-with-us/institutional-partnership' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-green-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links (Strictly hidden until official URLs are supplied, never render '#') */}
        {validSocialLinks.length > 0 && (
          <div className="flex items-center gap-4 mb-8">
            {validSocialLinks.map((link) => {
              const IconComponent = SOCIAL_ICON_MAP[link.icon] || Globe;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-green-light transition-colors p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
                  aria-label={link.name}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>
        )}

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} SportLead Africa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
