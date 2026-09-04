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
  fullName: z.string().min(2, 'Full name is required').max(100),
  email: z.string().email('Valid email address is required'),
  telephone: z.string().max(30).optional().or(z.literal('')),
  country: z.string().min(2, 'Country of residence is required').max(100),
  primaryDiscipline: z.string().min(1, 'Please select your primary discipline'),
  yearsOfExperience: z.string().min(1, 'Please select your experience level'),
  credentialsSummary: z.string().min(30, 'Please provide a brief summary of your track record (at least 30 characters)').max(3000),
  linkedInUrl: z.string().url('Please provide a valid URL').optional().or(z.literal('')),
  regionalDeskPreference: z.string().optional().or(z.literal('')),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must accept the privacy terms to apply',
  }),
  honeypot: z.string().max(0).optional().or(z.literal('')),
});
