'use client';

import React, { useState, useEffect } from 'react';
import { Button, FormField, PhoneField } from '@/components/ui';
import { EXPERT_DISCIPLINE_CATEGORIES } from '@/lib/expert-network';
import { COUNTRY_OPTIONS } from '@/lib/countries';
import { useFormDraft } from '@/lib/useFormDraft';
import { CheckCircle2, ArrowRight, ArrowLeft, Send, AlertCircle, FileText, Upload, ShieldCheck, UserCheck } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface FormFields {
  fullName: string;
  preferredName: string;
  email: string;
  telephone: string;
  country: string;
  city: string;
  jobTitle: string;
  organisation: string;
  primaryDiscipline: string;
  secondaryDisciplines: string;
  yearsOfExperience: string;
  academicQualifications: string;
  professionalRegistrations: string;
  projectExperience: string;
  servicesProvided: string;
  sectorExperience: string;
  workRegions: string;
  travelAvailability: string;
  languages: string;
  engagementType: string;
  linkedInUrl: string;
  websiteUrl: string;
  references: string;
  bio: string;
  statementOfInterest: string;
  consentVerification: boolean;
  consentPublication: boolean;
  acknowledgementNoGuarantee: boolean;
  privacyConsent: boolean;
  honeypot: string;
}

const INITIAL_FIELDS: FormFields = {
  fullName: '',
  preferredName: '',
  email: '',
  telephone: '',
  country: '',
  city: '',
  jobTitle: '',
  organisation: '',
  primaryDiscipline: '',
  secondaryDisciplines: '',
  yearsOfExperience: '',
  academicQualifications: '',
  professionalRegistrations: '',
  projectExperience: '',
  servicesProvided: '',
  sectorExperience: '',
  workRegions: '',
  travelAvailability: '',
  languages: '',
  engagementType: '',
  linkedInUrl: '',
  websiteUrl: '',
  references: '',
  bio: '',
  statementOfInterest: '',
  consentVerification: false,
  consentPublication: false,
  acknowledgementNoGuarantee: false,
  privacyConsent: false,
  honeypot: '',
};

const EXPERIENCE_OPTIONS = [
  { label: '1–3 years', value: '1-3 years' },
  { label: '4–7 years', value: '4-7 years' },
  { label: '8–12 years', value: '8-12 years' },
  { label: '13–20 years', value: '13-20 years' },
  { label: 'Over 20 years', value: 'Over 20 years' },
];

const TRAVEL_OPTIONS = [
  { label: 'Available for short-term continental travel across Africa', value: 'Continental travel' },
  { label: 'Available for regional assignments within base sub-region only', value: 'Regional assignments' },
  { label: 'Remote / desk-based advisory and virtual consultations only', value: 'Remote only' },
  { label: 'Fully flexible depending on project terms', value: 'Fully flexible' },
];

const ENGAGEMENT_OPTIONS = [
  { label: 'Project-based technical consulting', value: 'Project-based' },
  { label: 'Retainer advisory / expert on call', value: 'Retainer advisory' },
  { label: 'Technical review panel / facility auditor', value: 'Review panel / auditor' },
  { label: 'Open to all engagement models', value: 'Open / flexible' },
];

const STEPS = [
  { number: 1, title: 'Personal & Contact' },
  { number: 2, title: 'Professional Qualifications' },
  { number: 3, title: 'Experience & Scope' },
  { number: 4, title: 'Narrative & Uploads' },
  { number: 5, title: 'Consents & Submission' },
];

export default function ExpertApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    formData: fields,
    setFormData: setFields,
    isRestored,
    clearDraft,
  } = useFormDraft<FormFields>('sportlead_draft_expert_application', INITIAL_FIELDS);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ referenceId: string; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFields((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'cv' | 'photo' | 'certs') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (fileType === 'cv') {
      const file = files[0];
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!['.pdf', '.doc', '.docx'].includes(ext)) {
        setFieldErrors((prev) => ({ ...prev, cvFile: ['CV must be a PDF, DOC, or DOCX document'] }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFieldErrors((prev) => ({ ...prev, cvFile: ['CV file exceeds the 5MB size limit'] }));
        return;
      }
      setCvFile(file);
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.cvFile;
        return next;
      });
    } else if (fileType === 'photo') {
      const file = files[0];
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        setFieldErrors((prev) => ({ ...prev, photoFile: ['Photograph must be a JPG, JPEG, PNG, or WEBP image'] }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setFieldErrors((prev) => ({ ...prev, photoFile: ['Photograph file exceeds the 2MB size limit'] }));
        return;
      }
      setPhotoFile(file);
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.photoFile;
        return next;
      });
    } else if (fileType === 'certs') {
      const validCerts: File[] = [];
      const validExtensions = ['.pdf', '.doc', '.docx'];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (!validExtensions.includes(ext)) {
          setFieldErrors((prev) => ({ ...prev, certificateFiles: ['Certificates must be PDF, DOC, or DOCX documents only'] }));
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setFieldErrors((prev) => ({ ...prev, certificateFiles: ['Each certificate file must not exceed 5MB'] }));
          return;
        }
        validCerts.push(file);
      }
      setCertificateFiles(validCerts);
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.certificateFiles;
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string[]> = {};

    if (step === 1) {
      if (!fields.fullName.trim()) errors.fullName = ['Full legal name is required'];
      if (!fields.email.trim() || !fields.email.includes('@')) errors.email = ['Valid email address is required'];
      if (!fields.telephone.trim()) errors.telephone = ['Telephone/WhatsApp number is required'];
      if (!fields.country.trim()) errors.country = ['Country of residence is required'];
      if (!fields.city.trim()) errors.city = ['City / base location is required'];
    } else if (step === 2) {
      if (!fields.jobTitle.trim()) errors.jobTitle = ['Current job title is required'];
      if (!fields.organisation.trim()) errors.organisation = ['Organisation or practice status is required'];
      if (!fields.primaryDiscipline) errors.primaryDiscipline = ['Please select your primary discipline'];
      if (!fields.yearsOfExperience) errors.yearsOfExperience = ['Please select your years of experience'];
      if (!fields.academicQualifications.trim()) errors.academicQualifications = ['Academic qualifications are required'];
    } else if (step === 3) {
      if (fields.projectExperience.trim().length < 10) errors.projectExperience = ['Please provide details of your sport sector project experience'];
      if (!fields.servicesProvided.trim()) errors.servicesProvided = ['Please describe the services you can provide'];
      if (!fields.sectorExperience.trim()) errors.sectorExperience = ['Please state sports, sectors or facility types with experience'];
      if (!fields.workRegions.trim()) errors.workRegions = ['Please list countries or regions you can work in'];
      if (!fields.travelAvailability) errors.travelAvailability = ['Please select your travel availability'];
      if (!fields.languages.trim()) errors.languages = ['Please state languages spoken'];
      if (!fields.engagementType) errors.engagementType = ['Please select your preferred engagement type'];
    } else if (step === 4) {
      if (!fields.linkedInUrl.trim() || !fields.linkedInUrl.includes('linkedin.com')) {
        errors.linkedInUrl = ['A valid LinkedIn profile URL is required'];
      }
      if (fields.bio.trim().length < 30) {
        errors.bio = ['Please provide a professional biography (at least 30 characters)'];
      }
      if (fields.statementOfInterest.trim().length < 20) {
        errors.statementOfInterest = ['Please provide a brief statement of interest (at least 20 characters)'];
      }
      if (fields.references.trim().length < 10) {
        errors.references = ['Please provide professional reference details (name, organisation, contact)'];
      }
      if (!cvFile) {
        errors.cvFile = ['CV document upload (PDF/DOC) is required'];
      }
      if (!photoFile) {
        errors.photoFile = ['Professional photograph upload (JPG/PNG) is required'];
      }
    } else if (step === 5) {
      if (!fields.consentVerification) errors.consentVerification = ['You must consent to verification of submitted information'];
      if (!fields.consentPublication) errors.consentPublication = ['You must consent to publication of approved profile information'];
      if (!fields.acknowledgementNoGuarantee) errors.acknowledgementNoGuarantee = ['You must acknowledge network terms regarding project assignments'];
      if (!fields.privacyConsent) errors.privacyConsent = ['You must accept the privacy and data processing policy'];
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setLoading(true);
    setGeneralError('');

    try {
      const formData = new FormData();

      // Append text fields
      Object.entries(fields).forEach(([key, val]) => {
        formData.append(key, String(val));
      });

      // Append files
      if (cvFile) formData.append('cvFile', cvFile);
      if (photoFile) formData.append('photoFile', photoFile);
      certificateFiles.forEach((file) => {
        formData.append('certificateFiles', file);
      });

      const res = await fetch('/api/expert-application', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
          setGeneralError('Please correct the highlighted fields before submitting.');
        } else {
          throw new Error(data.error || 'Failed to submit expert application');
        }
        return;
      }

      setSuccessData({
        referenceId: data.referenceId,
        message: data.message,
      });
      trackEvent('Expert Application Submitted', { referenceId: data.referenceId });
      clearDraft();
      setFields(INITIAL_FIELDS);
      setCvFile(null);
      setPhotoFile(null);
      setCertificateFiles([]);
    } catch (err: any) {
      setGeneralError(err.message || 'An unexpected error occurred during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="bg-white rounded-3xl border border-warm-border p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-card">
        <div className="w-20 h-20 bg-brand-green-muted text-brand-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 size={44} />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-brand-green bg-brand-green-muted px-4 py-1.5 rounded-full inline-block mb-4">
          Application Successfully Submitted
        </span>

        <h2 className="text-3xl font-extrabold text-charcoal mb-4 tracking-tight">
          Expert Application Received
        </h2>

        <p className="text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto">
          Thank you for applying to the SportLead Africa Expert Network. Your credentials, professional qualifications, and documents have been recorded for governance committee review.
        </p>

        <div className="bg-warm-gray border border-warm-border rounded-2xl p-6 text-left mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-warm-border pb-4 mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-500">Application Reference</span>
            <span className="font-mono text-sm font-bold text-brand-green bg-white px-3 py-1 rounded-lg border border-brand-green/20">
              {successData.referenceId}
            </span>
          </div>
          <div className="text-xs text-gray-500 space-y-2 leading-relaxed">
            <p><strong>Review Cadence:</strong> Expert applications are reviewed on a rolling basis by our governance committee.</p>
            <p><strong>Next Steps:</strong> Should your profile and disciplinary credentials align with ongoing or upcoming institutional and infrastructure assignments across Africa, a coordinator will reach out directly to schedule an introductory interview and conduct reference verification.</p>
            <p><strong>Confirmation:</strong> A confirmation email has been dispatched to your registered address with your submission details.</p>
            <p><strong>Privacy:</strong> All submitted CVs, contact details, and references are treated with strict confidentiality.</p>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setSuccessData(null);
            setCurrentStep(1);
          }}
          className="rounded-full px-8 py-3 bg-brand-green hover:bg-brand-green-light font-bold text-white text-sm"
        >
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-warm-border shadow-card p-6 sm:p-10 lg:p-12">
      {/* Step Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Step {currentStep} of 5: {STEPS[currentStep - 1].title}
          </span>
          <span className="text-xs font-semibold text-gray-400">
            {Math.round((currentStep / 5) * 100)}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-brand-green h-full transition-all duration-300 ease-out rounded-full"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Step Numbers */}
        <div className="hidden sm:grid grid-cols-5 gap-2 mt-4 text-center">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className={`text-xs py-2 px-1 rounded-lg transition-colors ${
                step.number === currentStep
                  ? 'font-bold text-brand-green bg-brand-green-muted'
                  : step.number < currentStep
                  ? 'text-gray-700 font-medium'
                  : 'text-gray-400'
              }`}
            >
              {step.number}. {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Draft Restored Notice */}
      {isRestored && (
        <div className="mb-8 px-5 py-3.5 bg-brand-green-muted border border-brand-green/20 rounded-2xl text-brand-green text-xs sm:text-sm flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span>Draft restored from your last visit.</span>
          </div>
          <button
            type="button"
            onClick={() => {
              clearDraft();
              setFields(INITIAL_FIELDS);
            }}
            className="text-xs font-bold uppercase tracking-wider hover:underline text-brand-green-dark"
          >
            Clear Draft
          </button>
        </div>
      )}

      {/* General Error Banner */}
      {generalError && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Anti-bot honeypot */}
        <input
          type="text"
          name="honeypot"
          value={fields.honeypot}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* STEP 1: Personal & Contact */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-warm-border pb-4 mb-6">
              <h3 className="text-xl font-bold text-charcoal">Personal &amp; Contact Details</h3>
              <p className="text-sm text-gray-500 mt-1">
                Please provide your legal identity and contact coordinates. Contact information is strictly confidential and will never be published publicly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Full Legal Name"
                name="fullName"
                required
                placeholder="e.g. Dr. Jane O. Adebayo"
                value={fields.fullName}
                onChange={handleInputChange}
                error={fieldErrors.fullName?.[0]}
              />
              <FormField
                label="Preferred Professional Name"
                name="preferredName"
                placeholder="e.g. Jane Adebayo (optional)"
                value={fields.preferredName}
                onChange={handleInputChange}
                helpText="How you prefer to be addressed on assignments"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Email Address"
                name="email"
                type="email"
                required
                placeholder="e.g. jane.adebayo@organisation.org"
                value={fields.email}
                onChange={handleInputChange}
                error={fieldErrors.email?.[0]}
              />
              <PhoneField
                label="Telephone / WhatsApp"
                name="telephone"
                required
                placeholder="800 000 0000"
                value={fields.telephone}
                selectedCountry={fields.country}
                onChange={handleInputChange}
                error={fieldErrors.telephone?.[0]}
                helpText="Country code auto-selects with African country or choose manually"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Country of Residence"
                name="country"
                type="select"
                options={COUNTRY_OPTIONS}
                required
                placeholder="Select African Country of Residence"
                value={fields.country}
                onChange={handleInputChange}
                error={fieldErrors.country?.[0]}
              />
              <FormField
                label="City / Base Location"
                name="city"
                required
                placeholder="e.g. Lagos, Nairobi, Accra, Johannesburg"
                value={fields.city}
                onChange={handleInputChange}
                error={fieldErrors.city?.[0]}
              />
            </div>
          </div>
        )}

        {/* STEP 2: Professional Background */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-warm-border pb-4 mb-6">
              <h3 className="text-xl font-bold text-charcoal">Professional Qualifications &amp; Discipline</h3>
              <p className="text-sm text-gray-500 mt-1">
                Detail your current professional status, academic qualifications, and core technical discipline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Current Job Title"
                name="jobTitle"
                required
                placeholder="e.g. Senior Sport Infrastructure Planner / Director"
                value={fields.jobTitle}
                onChange={handleInputChange}
                error={fieldErrors.jobTitle?.[0]}
              />
              <FormField
                label="Current Organisation or Independent Practice"
                name="organisation"
                required
                placeholder="e.g. Independent Consultant, Federal Ministry, Apex Architecture"
                value={fields.organisation}
                onChange={handleInputChange}
                error={fieldErrors.organisation?.[0]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Primary Professional Discipline"
                name="primaryDiscipline"
                type="select"
                required
                placeholder="Select your primary discipline"
                options={EXPERT_DISCIPLINE_CATEGORIES.map((cat) => ({ label: cat, value: cat }))}
                value={fields.primaryDiscipline}
                onChange={handleInputChange}
                error={fieldErrors.primaryDiscipline?.[0]}
              />
              <FormField
                label="Years of Relevant Experience"
                name="yearsOfExperience"
                type="select"
                required
                placeholder="Select experience level"
                options={EXPERIENCE_OPTIONS}
                value={fields.yearsOfExperience}
                onChange={handleInputChange}
                error={fieldErrors.yearsOfExperience?.[0]}
              />
            </div>

            <FormField
              label="Secondary Areas of Expertise"
              name="secondaryDisciplines"
              placeholder="e.g. Facility safety audits, tournament operations, governance codes (optional)"
              value={fields.secondaryDisciplines}
              onChange={handleInputChange}
              helpText="Complementary practice areas where you have verifiable capability"
            />

            <FormField
              label="Academic Qualifications"
              name="academicQualifications"
              type="textarea"
              rows={2}
              required
              placeholder="e.g. B.Arch Architecture (UniLag), MSc Sports Management (Loughborough)"
              value={fields.academicQualifications}
              onChange={handleInputChange}
              error={fieldErrors.academicQualifications?.[0]}
              helpText="Degrees, diplomas, and granting academic institutions"
            />

            <FormField
              label="Professional Qualifications, Licences &amp; Memberships"
              name="professionalRegistrations"
              type="textarea"
              rows={2}
              placeholder="e.g. ARCON Registered Architect, Member NIA, PMP Certified (optional)"
              value={fields.professionalRegistrations}
              onChange={handleInputChange}
              helpText="Professional registrations, chartered statuses, or professional bodies where relevant"
            />
          </div>
        )}

        {/* STEP 3: Experience & Scope */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-warm-border pb-4 mb-6">
              <h3 className="text-xl font-bold text-charcoal">Sport Sector Experience &amp; Scope</h3>
              <p className="text-sm text-gray-500 mt-1">
                Describe your hands-on track record, regional mobility, and the types of advisory services you offer.
              </p>
            </div>

            <FormField
              label="Key Sport Sector Project Experience"
              name="projectExperience"
              type="textarea"
              rows={4}
              required
              placeholder="Outline 2–4 representative sport sector projects you have delivered or contributed to, including scope, client organisation, and your specific role."
              value={fields.projectExperience}
              onChange={handleInputChange}
              error={fieldErrors.projectExperience?.[0]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Types of Services You Can Provide"
                name="servicesProvided"
                type="textarea"
                rows={3}
                required
                placeholder="e.g. Facility condition assessments, governance reviews, master planning, procurement advisory"
                value={fields.servicesProvided}
                onChange={handleInputChange}
                error={fieldErrors.servicesProvided?.[0]}
              />
              <FormField
                label="Sports, Sectors &amp; Facility Types With Experience"
                name="sectorExperience"
                type="textarea"
                rows={3}
                required
                placeholder="e.g. Football stadia, multi-sport indoor arenas, school sports complexes, national federations"
                value={fields.sectorExperience}
                onChange={handleInputChange}
                error={fieldErrors.sectorExperience?.[0]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Countries or Regions You Can Work In"
                name="workRegions"
                required
                placeholder="e.g. West Africa, Pan-African, Nigeria, Kenya, Ghana"
                value={fields.workRegions}
                onChange={handleInputChange}
                error={fieldErrors.workRegions?.[0]}
              />
              <FormField
                label="Travel Availability"
                name="travelAvailability"
                type="select"
                required
                placeholder="Select travel availability"
                options={TRAVEL_OPTIONS}
                value={fields.travelAvailability}
                onChange={handleInputChange}
                error={fieldErrors.travelAvailability?.[0]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Languages Spoken &amp; Written"
                name="languages"
                required
                placeholder="e.g. English (Fluent), French (Professional), Swahili"
                value={fields.languages}
                onChange={handleInputChange}
                error={fieldErrors.languages?.[0]}
              />
              <FormField
                label="Preferred Engagement Type"
                name="engagementType"
                type="select"
                required
                placeholder="Select engagement type"
                options={ENGAGEMENT_OPTIONS}
                value={fields.engagementType}
                onChange={handleInputChange}
                error={fieldErrors.engagementType?.[0]}
              />
            </div>
          </div>
        )}

        {/* STEP 4: Links, Narrative & Uploads */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-warm-border pb-4 mb-6">
              <h3 className="text-xl font-bold text-charcoal">Links, Narrative &amp; Document Uploads</h3>
              <p className="text-sm text-gray-500 mt-1">
                Provide your online references, professional narrative, CV, photograph, and optional certificates (max 5MB each).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="LinkedIn Profile URL"
                name="linkedInUrl"
                required
                placeholder="https://linkedin.com/in/yourprofile"
                value={fields.linkedInUrl}
                onChange={handleInputChange}
                error={fieldErrors.linkedInUrl?.[0]}
              />
              <FormField
                label="Professional Website / Portfolio URL"
                name="websiteUrl"
                placeholder="https://yourportfolio.com (optional)"
                value={fields.websiteUrl}
                onChange={handleInputChange}
                error={fieldErrors.websiteUrl?.[0]}
              />
            </div>

            {/* Document & Media Uploads (Fields 23, 24, 25) */}
            <div className="bg-warm-gray border border-warm-border rounded-2xl p-6 space-y-6">
              <h4 className="text-base font-bold text-charcoal flex items-center gap-2">
                <Upload size={18} className="text-brand-green" />
                Required &amp; Optional Documents
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-charcoal block mb-2">
                    Curriculum Vitae (CV) <span className="text-brand-green">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'cv')}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-green file:text-white hover:file:bg-brand-green-light cursor-pointer border border-warm-border rounded-xl p-2 bg-white"
                  />
                  {cvFile && (
                    <p className="text-xs text-brand-green font-medium mt-1 flex items-center gap-1">
                      <FileText size={12} /> Selected: {cvFile.name} ({(cvFile.size / 1024).toFixed(0)} KB)
                    </p>
                  )}
                  {fieldErrors.cvFile && (
                    <p className="text-xs text-red-500 font-medium mt-1">{fieldErrors.cvFile[0]}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Accepted: PDF, DOC, DOCX up to 5MB</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-charcoal block mb-2">
                    Professional Photograph <span className="text-brand-green">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(e) => handleFileChange(e, 'photo')}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-green file:text-white hover:file:bg-brand-green-light cursor-pointer border border-warm-border rounded-xl p-2 bg-white"
                  />
                  {photoFile && (
                    <p className="text-xs text-brand-green font-medium mt-1 flex items-center gap-1">
                      <UserCheck size={12} /> Selected: {photoFile.name} ({(photoFile.size / 1024).toFixed(0)} KB)
                    </p>
                  )}
                  {fieldErrors.photoFile && (
                    <p className="text-xs text-red-500 font-medium mt-1">{fieldErrors.photoFile[0]}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Accepted: High-resolution JPG, JPEG, PNG, or WEBP up to 2MB</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-charcoal block mb-2">
                  Relevant Certificates or Licences (Optional, multiple)
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'certs')}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-green-muted file:text-brand-green hover:file:bg-brand-green/20 cursor-pointer border border-warm-border rounded-xl p-2 bg-white"
                />
                {certificateFiles.length > 0 && (
                  <p className="text-xs text-brand-green font-medium mt-1">
                    {certificateFiles.length} file(s) selected: {certificateFiles.map((f) => f.name).join(', ')}
                  </p>
                )}
                {fieldErrors.certificateFiles && (
                  <p className="text-xs text-red-500 font-medium mt-1">{fieldErrors.certificateFiles[0]}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">Accepted: PDF, DOC, DOCX up to 5MB each</p>
              </div>
            </div>

            {/* Field 26: Professional references */}
            <FormField
              label="Professional References"
              name="references"
              type="textarea"
              rows={3}
              required
              placeholder="Provide at least 2 professional references (Full Name, Title, Organisation, Email, Telephone)."
              value={fields.references}
              onChange={handleInputChange}
              error={fieldErrors.references?.[0]}
              helpText="References will only be contacted after initial credential review."
            />

            {/* Field 27: Short professional biography */}
            <FormField
              label="Short Professional Biography"
              name="bio"
              type="textarea"
              rows={4}
              required
              placeholder="Provide a 2-3 paragraph professional overview of your background, career trajectory, and core contributions to the sport industry."
              value={fields.bio}
              onChange={handleInputChange}
              error={fieldErrors.bio?.[0]}
              helpText="This biography will form the foundation of your expert directory profile upon approval."
            />

            {/* Field 28: Why the applicant wants to join SportLead Africa */}
            <FormField
              label="Why Do You Want to Join SportLead Africa?"
              name="statementOfInterest"
              type="textarea"
              rows={3}
              required
              placeholder="Explain how your expertise aligns with our mission to build stronger sport systems, institutions, and infrastructure across Africa."
              value={fields.statementOfInterest}
              onChange={handleInputChange}
              error={fieldErrors.statementOfInterest?.[0]}
            />
          </div>
        )}

        {/* STEP 5: Consents & Submission */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-warm-border pb-4 mb-6">
              <h3 className="text-xl font-bold text-charcoal">Declarations &amp; Mandatory Consents</h3>
              <p className="text-sm text-gray-500 mt-1">
                Please review and confirm each mandatory declaration. All four consents are required to submit your application to the network.
              </p>
            </div>

            {/* Application Summary Card */}
            <div className="bg-warm-gray border border-warm-border rounded-2xl p-6 text-sm space-y-2 mb-6">
              <h4 className="font-bold text-charcoal mb-2">Summary Review</h4>
              <p><strong>Applicant:</strong> {fields.fullName} {fields.preferredName && `(${fields.preferredName})`}</p>
              <p><strong>Discipline:</strong> {fields.primaryDiscipline || 'Not specified'}</p>
              <p><strong>Experience:</strong> {fields.yearsOfExperience} | {fields.jobTitle} at {fields.organisation}</p>
              <p><strong>Location:</strong> {fields.city}, {fields.country}</p>
              <p><strong>Documents Attached:</strong> {cvFile ? `CV (${cvFile.name})` : 'Missing'}, {photoFile ? `Photo (${photoFile.name})` : 'Missing'}, {certificateFiles.length} certificate(s)</p>
            </div>

            <div className="space-y-4 pt-2">
              <FormField
                type="checkbox"
                name="consentVerification"
                label="I consent to the independent verification of all submitted academic qualifications, licences, and professional references by SportLead Africa."
                value={fields.consentVerification}
                onChange={handleInputChange}
                error={fieldErrors.consentVerification?.[0]}
                required
              />

              <FormField
                type="checkbox"
                name="consentPublication"
                label="I consent to the publication of my approved professional profile (name, photograph, discipline, qualifications, and biography) on the SportLead Africa Expert Network public directory."
                value={fields.consentPublication}
                onChange={handleInputChange}
                error={fieldErrors.consentPublication?.[0]}
                required
              />

              <FormField
                type="checkbox"
                name="acknowledgementNoGuarantee"
                label="I acknowledge that admission to the SportLead Africa Expert Network does not constitute an employment contract or guarantee project assignments or commercial engagements."
                value={fields.acknowledgementNoGuarantee}
                onChange={handleInputChange}
                error={fieldErrors.acknowledgementNoGuarantee?.[0]}
                required
              />

              <FormField
                type="checkbox"
                name="privacyConsent"
                label="I consent to the processing, confidential storage, and handling of my personal and professional information in accordance with the SportLead Africa Privacy Policy."
                value={fields.privacyConsent}
                onChange={handleInputChange}
                error={fieldErrors.privacyConsent?.[0]}
                required
              />
            </div>
          </div>
        )}

        {/* Form Controls */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t border-warm-border">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={loading}
              className="w-full sm:w-auto rounded-full px-6 py-3 border-warm-border hover:bg-gray-50 text-charcoal font-semibold text-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              className="w-full sm:w-auto rounded-full px-8 py-3 bg-brand-green hover:bg-brand-green-light font-bold text-white text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              Continue
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full sm:w-auto rounded-full px-10 py-3.5 bg-brand-green hover:bg-brand-green-light font-bold text-white text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Submitting Credentials...</span>
              ) : (
                <>
                  <span>Submit Application</span>
                  <Send size={16} />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
