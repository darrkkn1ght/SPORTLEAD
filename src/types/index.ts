export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ServicePillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface AudienceItem {
  label: string;
  icon: string;
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface ApproachStep {
  title: string;
  description: string;
  icon: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface LeaderProfile {
  name: string;
  role: string;
  bio: string;
  qualifications: string[];
  registrations: string[];
  photo: string;
  linkedin?: string;
  website?: string;
  areas: string[];
}

export interface ContactFormData {
  name: string;
  organisation: string;
  role: string;
  email: string;
  telephone: string;
  country: string;
  inquiryType: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone';
  privacyConsent: boolean;
}

export interface ProjectInquiryData {
  name: string;
  role: string;
  organisation: string;
  email: string;
  telephone: string;
  country: string;
  projectLocation: string;
  organisationType: string;
  serviceRequired: string[];
  description: string;
  currentStage: string;
  desiredOutcome: string;
  timeline: string;
  budgetRange: string;
  stakeholders: string;
  howHeard: string;
  privacyConsent: boolean;
}
