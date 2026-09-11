import type { ExpertProfile } from '@/types';

export const EXPERT_DISCIPLINE_CATEGORIES = [
  'Sport Infrastructure Planning & Development',
  'Sport Facility Auditing & Improvement',
  'Sport Governance & Administration',
  'Strategy & Institutional Development',
  'Competition & Event Management',
  'Sport Project Development & Management',
];

/**
 * Approved Expert Profiles Registry
 * Profiles will be published here as specialists complete review and onboarding.
 */
export const APPROVED_EXPERTS: ExpertProfile[] = [];

export function getExpertById(id: string): ExpertProfile | undefined {
  return APPROVED_EXPERTS.find((expert) => expert.id === id);
}

export function getAllExperts(): ExpertProfile[] {
  return APPROVED_EXPERTS;
}
