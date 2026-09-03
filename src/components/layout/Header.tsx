'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { Menu, ChevronDown } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-brand-navy/95 backdrop-blur-md shadow-sm border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-white font-bold text-xl tracking-wider uppercase">
                SportLead Africa
              </span>
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
                    className={`flex items-center text-sm font-semibold transition-colors ${
                      pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')
                        ? 'text-brand-gold'
                        : 'text-white hover:text-brand-gold'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform ${
                          hoveredItem === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && hoveredItem === item.label && (
                    <div className="absolute top-full left-0 mt-[-10px] pt-[10px]">
                      <div className="bg-brand-navy-light rounded-xl shadow-xl py-3 min-w-[240px] border border-white/10">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block px-5 py-2.5 text-sm font-medium transition-colors ${
                              pathname === child.href
                                ? 'text-brand-gold bg-white/5'
                                : 'text-gray-200 hover:text-brand-gold hover:bg-white/5'
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
                <Button variant="primary" href="/discuss-a-project" className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light rounded-full border-none font-bold">
                  Discuss a Project
                </Button>
              </div>
              <button
                className="lg:hidden text-white p-2 focus:outline-none hover:text-brand-gold transition-colors"
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
