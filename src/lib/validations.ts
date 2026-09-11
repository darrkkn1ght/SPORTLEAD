import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  organisation: z.string().max(150).optional().or(z.literal('')),
  role: z.string().max(100).optional().or(z.literal('')),
  telephone: z.string().max(30).optional().or(z.literal('')),
  country: z.string().max(100).optional().or(z.literal('')),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(4000),
  preferredContact: z.enum(['Email', 'Phone', 'WhatsApp']).default('Email'),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to continue',
  }),
  honeypot: z.string().max(0).optional().or(z.literal('')),
});

export const projectInquirySchema = z.object({
  name: z.string().min(2, 'Full name is required').max(100),
  role: z.string().min(2, 'Role / Title is required').max(100),
  organisation: z.string().min(2, 'Organisation name is required').max(150),
  email: z.string().email('Valid email address is required'),
  telephone: z.string().max(30).optional().or(z.literal('')),
  country: z.string().min(2, 'Country is required').max(100),
  projectLocation: z.string().min(2, 'City / Region is required').max(150),
  organisationType: z.string().min(1, 'Please select an organisation type'),
  serviceRequired: z.string().min(1, 'Please select the primary service required'),
  description: z.string().min(20, 'Please provide a detailed description (at least 20 characters)').max(5000),
  projectStage: z.string().optional().or(z.literal('')),
  desiredOutcome: z.string().max(2000).optional().or(z.literal('')),
  timeline: z.string().optional().or(z.literal('')),
  budget: z.string().optional().or(z.literal('')),
  stakeholders: z.string().max(1000).optional().or(z.literal('')),
  howHeard: z.string().optional().or(z.literal('')),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must accept the privacy terms to submit your brief',
  }),
  honeypot: z.string().max(0).optional().or(z.literal('')),
});

export const expertApplicationSchema = z.object({
  // Personal & contact
  fullName: z.string().min(2, 'Full legal name is required').max(100),
  preferredName: z.string().max(100).optional().or(z.literal('')),
  email: z.string().email('Valid email address is required'),
  telephone: z.string().min(5, 'Telephone/WhatsApp number is required').max(30),
  country: z.string().min(2, 'Country of residence is required').max(100),
  city: z.string().min(2, 'City / base location is required').max(100),

  // Professional
  jobTitle: z.string().min(2, 'Current job title is required').max(100),
  organisation: z.string().min(2, 'Current organisation or practice status is required').max(150),
  primaryDiscipline: z.string().min(1, 'Please select your primary discipline'),
  secondaryDisciplines: z.string().max(300).optional().or(z.literal('')),
  yearsOfExperience: z.string().min(1, 'Please select your years of relevant experience'),
  academicQualifications: z.string().min(2, 'Academic qualifications are required').max(500),
  professionalRegistrations: z.string().max(500).optional().or(z.literal('')),

  // Experience
  projectExperience: z.string().min(10, 'Please describe key sport sector project experience').max(3000),
  servicesProvided: z.string().min(5, 'Please list types of services you can provide').max(1000),
  sectorExperience: z.string().min(5, 'Please specify sports, sectors or facility types').max(1000),
  workRegions: z.string().min(2, 'Please state countries or regions you can work in').max(500),
  travelAvailability: z.string().min(1, 'Please select travel availability'),
  languages: z.string().min(2, 'Languages spoken are required').max(300),
  engagementType: z.string().min(1, 'Please select your preferred engagement type'),

  // Links & uploads / references
  linkedInUrl: z.string().url('Please enter a valid LinkedIn URL').refine(url => url.includes('linkedin.com'), {
    message: 'Must be a valid LinkedIn profile URL',
  }),
  websiteUrl: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  references: z.string().min(10, 'Please provide professional reference details (name, title, organisation, contact)').max(2000),

  // Narrative
  bio: z.string().min(30, 'Please provide a short professional biography (minimum 30 characters)').max(3000),
  statementOfInterest: z.string().min(20, 'Please explain why you want to join SportLead Africa (minimum 20 characters)').max(2000),

  // Consents (all 4 required)
  consentVerification: z.boolean().refine(val => val === true, {
    message: 'You must consent to verification of submitted information',
  }),
  consentPublication: z.boolean().refine(val => val === true, {
    message: 'You must consent to publication of approved professional profile information',
  }),
  acknowledgementNoGuarantee: z.boolean().refine(val => val === true, {
    message: 'You must acknowledge that admission does not guarantee project assignments',
  }),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to privacy and data processing',
  }),

  // Legacy / optional fields for backwards compatibility
  credentialsSummary: z.string().max(3000).optional().or(z.literal('')),
  regionalDeskPreference: z.string().max(100).optional().or(z.literal('')),
  honeypot: z.string().max(0).optional().or(z.literal('')),
});

export type ExpertApplicationFormData = z.infer<typeof expertApplicationSchema>;

