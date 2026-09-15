'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { Menu, ChevronDown } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AfricaEmblem } from './AfricaEmblem';
import MobileNav from './MobileNav';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The homepage is the only page with a full-height dark hero where a transparent
  // header with white text is used before scroll. All other pages feature light hero
  // sections and must display the high-contrast dark-on-light header immediately on load.
  const isDarkHero = pathname === '/';
  const isTransparent = isDarkHero && !isScrolled;

  const headerBg = isTransparent
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-md shadow-nav border-b border-warm-border';
  const textColor = isTransparent ? 'text-white/80' : 'text-charcoal/70';
  const textHover = isTransparent ? 'hover:text-white' : 'hover:text-brand-green';
  const activeColor = isTransparent ? 'text-white' : 'text-brand-green';
  const logoColor = isTransparent ? 'text-white' : 'text-charcoal';
  const mobileToggleColor = isTransparent
    ? 'text-white hover:text-white/70'
    : 'text-charcoal hover:text-brand-green';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
              <span className={`font-bold text-xl tracking-wider uppercase transition-colors duration-300 ${logoColor}`}>
                SportLead Africa
              </span>
              <AfricaEmblem size={28} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative group py-6"
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center text-sm font-semibold transition-colors duration-300 ${pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')
                      ? activeColor
                      : `${textColor} ${textHover}`
                      }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform ${hoveredItem === item.label ? 'rotate-180' : ''
                          }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && hoveredItem === item.label && (
                    <div className="absolute top-full left-0 mt-[-10px] pt-[10px]">
                      <div className="bg-white rounded-xl shadow-card-hover py-3 min-w-[240px] border border-warm-border">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block px-5 py-2.5 text-sm font-medium transition-colors ${pathname === child.href
                              ? 'text-brand-green bg-brand-green-muted'
                              : 'text-gray-600 hover:text-brand-green hover:bg-warm-gray'
                              }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <Button variant="primary" href="/discuss-a-project" className="bg-brand-green text-white hover:bg-brand-green-light rounded-full border-none font-bold">
                  Discuss a Project
                </Button>
              </div>
              <button
                className={`lg:hidden p-2 focus:outline-none transition-colors duration-300 ${mobileToggleColor}`}
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
