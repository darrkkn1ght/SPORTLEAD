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
  titleLine?: string;
  bio: string | string[];
  qualifications: string | string[];
  registrations?: string[];
  photo: string;
  photoAlt?: string;
  linkedin?: string;
  website?: string;
  areas?: string[];
}

export interface ExpertProfile {
  id: string;
  fullName: string;
  photograph?: string;
  primaryDiscipline: string;
  currentRole: string;
  currentOrganisation: string;
  country: string;
  shortBio: string | string[];
  academicQualifications: string[];
  professionalQualifications?: string[];
  areasOfExpertise: string[];
  relevantProjectExperience?: string[];
  regionsOfPractice?: string[];
  languages?: string[];
  linkedin?: string;
  website?: string;
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
  preferredContact: 'Email' | 'Phone' | 'WhatsApp';
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
  serviceRequired: string;
  description: string;
  currentStage: string;
  desiredOutcome: string;
  timeline: string;
  budgetRange: string;
  stakeholders: string;
  preferredContact?: 'Email' | 'Phone' | 'WhatsApp';
  documentName?: string;
  howHeard: string;
  privacyConsent: boolean;
}

export interface FacilityFundingData {
  organisationName: string;
  contactPerson: string;
  email: string;
  telephone?: string;
  country: string;
  geographicArea: string;
  facilityType: string;
  intendedSupport: string;
  fundingRange?: string;
  partnershipModel: string;
  timeline: string;
  message: string;
  documentName?: string;
  privacyConsent: boolean;
}

export interface InstitutionalPartnershipData {
  institutionName: string;
  institutionType: string;
  contactPerson: string;
  role: string;
  email: string;
  telephone?: string;
  country: string;
  collaborationArea: string;
  objectives: string;
  duration: string;
  existingInitiative?: string;
  message: string;
  documentName?: string;
  privacyConsent: boolean;
}
