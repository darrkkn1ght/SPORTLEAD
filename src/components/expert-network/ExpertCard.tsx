import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { MapPin, ArrowRight } from '@/components/ui/Icon';
import type { ExpertProfile } from '@/types';

interface ExpertCardProps {
  expert: ExpertProfile;
}

export function ExpertCard({ expert }: ExpertCardProps) {
  const initials = expert.fullName
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const expertiseTags = expert.areasOfExpertise.slice(0, 4);

  return (
    <div className="bg-white rounded-3xl border border-warm-border p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full group">
      {/* Top row: Photograph + Discipline badge */}
      <div className="flex items-start gap-4 mb-5">
        {expert.photograph ? (
          <img
            src={expert.photograph}
            alt={expert.fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-warm-border shrink-0 shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-charcoal-light to-charcoal text-brand-gold font-bold text-lg sm:text-xl flex items-center justify-center shrink-0 border border-warm-border shadow-sm">
            {initials || 'SL'}
          </div>
        )}

        <div className="flex-grow min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green bg-brand-green-muted px-2.5 py-1 rounded-full inline-block mb-1.5 truncate max-w-full">
            {expert.primaryDiscipline}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-charcoal tracking-tight truncate group-hover:text-brand-green transition-colors">
            {expert.fullName}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {expert.currentRole}
            {expert.currentOrganisation ? ` • ${expert.currentOrganisation}` : ''}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <MapPin size={14} className="text-brand-green shrink-0" />
        <span>{expert.country}</span>
      </div>

      {/* 2-4 Expertise Tags */}
      {expertiseTags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-1.5 flex-grow">
          {expertiseTags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-warm-gray text-charcoal px-2.5 py-1 rounded-md border border-warm-border font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action CTA */}
      <div className="pt-4 border-t border-warm-border/80 mt-auto">
        <Link href={`/expert-network/${expert.id}`} className="block">
          <Button
            variant="outline"
            className="w-full justify-center border-warm-border hover:border-brand-green text-charcoal hover:text-brand-green rounded-full text-xs sm:text-sm font-bold gap-1.5 py-2.5"
          >
            <span>View Profile</span>
            <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ExpertCard;
