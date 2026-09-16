'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { X, ChevronDown } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { AfricaEmblem } from './AfricaEmblem';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  // Single active accordion state ensures only one section is open at a time
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close accordion and mobile nav on pathname change
  useEffect(() => {
    setExpandedItem(null);
  }, [pathname]);

  const toggleExpand = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-md flex flex-col transition-opacity duration-300"
    >
      <div className="flex items-center justify-between p-6 border-b border-warm-border">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg"
        >
          <span className="text-charcoal font-bold text-xl tracking-wider uppercase">
            SportLead Africa
          </span>
          <AfricaEmblem size={26} />
        </Link>
        <button
          onClick={onClose}
          className="text-charcoal p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg hover:text-brand-green transition-colors"
          aria-label="Close navigation menu"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
          {NAV_ITEMS.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isExpanded = expandedItem === item.label;
            const isItemActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) && item.href !== '/');
            const slug = slugify(item.label);

            return (
              <div key={item.label} className="border-b border-warm-border/50 pb-2">
                <div className="flex items-center justify-between">
                  {/* Parent item is also a clickable link */}
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block py-3 text-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded ${
                      isItemActive
                        ? 'text-brand-green font-bold'
                        : 'text-charcoal hover:text-brand-green'
                    }`}
                  >
                    {item.label}
                  </Link>

                  {/* Dropdown accordion trigger button */}
                  {hasChildren && (
                    <button
                      type="button"
                      id={`mobile-trigger-${slug}`}
                      aria-haspopup="true"
                      aria-expanded={isExpanded}
                      aria-controls={`mobile-accordion-${slug}`}
                      aria-label={`Toggle ${item.label} submenu`}
                      onClick={() => toggleExpand(item.label)}
                      className="p-3 text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg hover:text-brand-green"
                    >
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-brand-green' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Accordion content: only one open at a time */}
                {hasChildren && item.children && isExpanded && (
                  <div
                    id={`mobile-accordion-${slug}`}
                    role="region"
                    aria-labelledby={`mobile-trigger-${slug}`}
                    className="pl-4 flex flex-col gap-2 border-l-2 border-brand-green/30 ml-2 mt-1 mb-3 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className={`block py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded ${
                            isChildActive
                              ? 'text-brand-green font-bold bg-brand-green-muted/50 px-2 rounded'
                              : 'text-gray-600 hover:text-brand-green'
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-warm-border bg-warm-gray mt-auto">
        <div onClick={onClose}>
          <Button
            variant="primary"
            href="/discuss-a-project"
            className="w-full justify-center bg-brand-green text-white hover:bg-brand-green-light rounded-full font-bold py-3.5 shadow-sm"
          >
            Discuss a Project
          </Button>
        </div>
      </div>
    </div>
  );
}
