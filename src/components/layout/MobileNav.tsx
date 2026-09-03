'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { X, ChevronDown } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-brand-navy/95 backdrop-blur-md flex flex-col transition-opacity duration-300">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <span className="text-white font-bold text-xl tracking-wider uppercase">
          SportLead Africa
        </span>
        <button
          onClick={onClose}
          className="text-white p-2 focus:outline-none hover:text-brand-gold transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block py-3 text-lg font-semibold transition-colors ${
                    pathname === item.href ? 'text-brand-gold' : 'text-white hover:text-brand-gold'
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="p-3 text-white focus:outline-none hover:text-brand-gold"
                    aria-label={`Toggle ${item.label}`}
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        expandedItems.includes(item.label) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {item.children && expandedItems.includes(item.label) && (
                <div className="pl-4 flex flex-col gap-2 border-l border-white/10 ml-2 mt-2 mb-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className={`block py-2 text-base transition-colors ${
                        pathname === child.href
                          ? 'text-brand-gold'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-white/10 bg-brand-navy-light mt-auto">
        <div onClick={onClose}>
          <Button variant="primary" href="/discuss-a-project" className="w-full justify-center bg-brand-gold text-brand-navy hover:bg-brand-gold-light rounded-full font-bold">
            Discuss a Project
          </Button>
        </div>
      </div>
    </div>
  );
}
