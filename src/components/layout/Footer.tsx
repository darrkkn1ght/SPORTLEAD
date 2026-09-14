import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { HEADQUARTERS, SERVICE_PILLARS, SOCIAL_LINKS } from '@/lib/constants';
import { LinkedIn, Instagram, Twitter, Facebook, Globe, MapPin } from '@/components/ui/Icon';

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LinkedIn,
  Instagram,
  Twitter,
  Facebook,
  Globe,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-bold text-2xl tracking-wider uppercase">
                SportLead Africa
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building Better Sport Systems Across Africa.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>{HEADQUARTERS}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Expert Network', href: '/expert-network' },
                { label: 'Insights', href: '/insights' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-green-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Services</h3>
            <ul className="space-y-4">
              {SERVICE_PILLARS.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-brand-green-light transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Partner With Us */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Partner With Us</h3>
            <ul className="space-y-4">
              {[
                { label: 'Commission a Project', href: '/discuss-a-project' },
                { label: 'Fund a Facility Project', href: '/partner-with-us#fund' },
                { label: 'Join Our Expert Network', href: '/expert-network/apply' },
                { label: 'Institutional Partnerships', href: '/partner-with-us#institutional' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-green-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links (displayed only when real URLs are configured) */}
        {SOCIAL_LINKS.filter((l) => l.url && l.url !== '#').length > 0 && (
          <div className="flex items-center gap-4 mb-8">
            {SOCIAL_LINKS.filter((l) => l.url && l.url !== '#').map((link) => {
              const IconComponent = SOCIAL_ICON_MAP[link.icon] || Globe;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-brand-green-light transition-colors p-2"
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
          <p className="text-gray-500 text-sm">
            © {currentYear} SportLead Africa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
