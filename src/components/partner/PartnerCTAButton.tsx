'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { trackEvent, type AnalyticsEventName } from '@/lib/analytics';

interface PartnerCTAButtonProps {
  href: string;
  eventName: AnalyticsEventName;
  text: string;
}

export function PartnerCTAButton({ href, eventName, text }: PartnerCTAButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant="primary"
        onClick={() => trackEvent(eventName)}
        className="w-full sm:w-auto bg-brand-green text-white hover:bg-brand-green-light rounded-full px-8 py-3 font-bold text-sm shadow-sm"
      >
        {text}
      </Button>
    </Link>
  );
}
