'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { Menu, ChevronDown } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AfricaEmblem } from './AfricaEmblem';
import MobileNav from './MobileNav';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navContainerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const menuItemRefs = useRef<Record<string, (HTMLAnchorElement | null)[]>>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside or route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, label: string) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setOpenDropdown(label);
      setTimeout(() => {
        const firstItem = menuItemRefs.current[label]?.[0];
        firstItem?.focus();
      }, 50);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpenDropdown(null);
    }
  };

  const handleMenuItemKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    label: string,
    currentIndex: number,
    totalItems: number
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % totalItems;
      menuItemRefs.current[label]?.[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
      menuItemRefs.current[label]?.[prevIndex]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpenDropdown(null);
      triggerRefs.current[label]?.focus();
    } else if (e.key === 'Tab' && !e.shiftKey && currentIndex === totalItems - 1) {
      setOpenDropdown(null);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg"
            >
              <span className={`font-bold text-xl tracking-wider uppercase transition-colors duration-300 ${logoColor}`}>
                SportLead Africa
              </span>
              <AfricaEmblem size={28} />
            </Link>

            {/* Desktop Nav */}
            <nav ref={navContainerRef} className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isItemActive =
                  pathname === item.href ||
                  (pathname.startsWith(item.href) && item.href !== '/');
                const slug = slugify(item.label);

                return (
                  <div
                    key={item.label}
                    className="relative py-6 flex items-center"
                    onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                  >
                    {/* Parent item is also clickable link */}
                    <Link
                      href={item.href}
                      className={`text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded ${
                        isItemActive ? activeColor : `${textColor} ${textHover}`
                      }`}
                    >
                      {item.label}
                    </Link>

                    {/* Accessible dropdown trigger button */}
                    {hasChildren && item.children && (
                      <>
                        <button
                          ref={(el) => {
                            triggerRefs.current[item.label] = el;
                          }}
                          type="button"
                          id={`nav-trigger-${slug}`}
                          aria-haspopup="true"
                          aria-expanded={openDropdown === item.label}
                          aria-controls={`nav-dropdown-${slug}`}
                          aria-label={`${item.label} submenu`}
                          onClick={() => toggleDropdown(item.label)}
                          onKeyDown={(e) => handleTriggerKeyDown(e, item.label)}
                          className={`ml-1 p-1 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${textColor} ${textHover}`}
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              openDropdown === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === item.label && (
                          <div
                            id={`nav-dropdown-${slug}`}
                            role="menu"
                            aria-labelledby={`nav-trigger-${slug}`}
                            className="absolute top-full left-0 mt-[-8px] pt-[8px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                          >
                            <div className="bg-white rounded-xl shadow-card-hover py-3 min-w-[280px] border border-warm-border">
                              {item.children.map((child, childIdx) => {
                                const isChildActive = pathname === child.href;
                                return (
                                  <Link
                                    key={child.label}
                                    ref={(el) => {
                                      if (!menuItemRefs.current[item.label]) {
                                        menuItemRefs.current[item.label] = [];
                                      }
                                      menuItemRefs.current[item.label][childIdx] = el;
                                    }}
                                    role="menuitem"
                                    href={child.href}
                                    onClick={() => setOpenDropdown(null)}
                                    onKeyDown={(e) =>
                                      handleMenuItemKeyDown(
                                        e,
                                        item.label,
                                        childIdx,
                                        item.children!.length
                                      )
                                    }
                                    className={`block px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                                      isChildActive
                                        ? 'text-brand-green bg-brand-green-muted font-semibold'
                                        : 'text-gray-600 hover:text-brand-green hover:bg-warm-gray'
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <Button
                  variant="primary"
                  href="/discuss-a-project"
                  className="bg-brand-green text-white hover:bg-brand-green-light rounded-full border-none font-bold shadow-sm"
                >
                  Discuss a Project
                </Button>
              </div>
              <button
                className={`lg:hidden p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg transition-colors duration-300 ${mobileToggleColor}`}
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
