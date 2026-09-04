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
    <div className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-md flex flex-col transition-opacity duration-300">
      <div className="flex items-center justify-between p-6 border-b border-warm-border">
        <span className="text-charcoal font-bold text-xl tracking-wider uppercase">
          SportLead Africa
        </span>
        <button
          onClick={onClose}
          className="text-charcoal p-2 focus:outline-none hover:text-brand-green transition-colors"
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
                  className={`block py-3 text-lg font-semibold transition-colors ${pathname === item.href ? 'text-brand-green' : 'text-charcoal hover:text-brand-green'
                    }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="p-3 text-charcoal focus:outline-none hover:text-brand-green"
                    aria-label={`Toggle ${item.label}`}
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${expandedItems.includes(item.label) ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                )}
              </div>

              {item.children && expandedItems.includes(item.label) && (
                <div className="pl-4 flex flex-col gap-2 border-l-2 border-brand-green/20 ml-2 mt-2 mb-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className={`block py-2 text-base transition-colors ${pathname === child.href
                          ? 'text-brand-green'
                          : 'text-gray-500 hover:text-charcoal'
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

      <div className="p-6 border-t border-warm-border bg-warm-gray mt-auto">
        <div onClick={onClose}>
          <Button variant="primary" href="/discuss-a-project" className="w-full justify-center bg-brand-green text-white hover:bg-brand-green-light rounded-full font-bold">
            Discuss a Project
          </Button>
        </div>
      </div>
    </div>
  );
}
