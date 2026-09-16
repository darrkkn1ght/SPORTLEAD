'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { trackEvent } from '@/lib/analytics';

interface DiscussServiceCTAProps {
  slug: string;
  title: string;
}

export function DiscussServiceButton({ slug, title }: DiscussServiceCTAProps) {
  return (
    <Link href={`/discuss-a-project?service=${slug}`}>
      <Button
        variant="primary"
        size="lg"
        onClick={() => trackEvent('Discuss This Service', { service: title })}
        className="bg-brand-green text-white hover:bg-brand-green-light rounded-full px-10 py-4 font-bold text-base shadow-lg"
      >
        Discuss This Service
      </Button>
    </Link>
  );
}
