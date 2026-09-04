'use client';

import { useState } from 'react';
import { Button, FormField } from '@/components/ui';
import { ORGANISATION_TYPES, SERVICE_OPTIONS, PROJECT_STAGES, BUDGET_RANGES, TIMELINE_OPTIONS } from '@/lib/constants';
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Clock, FileText, Send, Building2, Layers, AlertCircle } from 'lucide-react';

interface FormState {
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
  projectStage: string;
  desiredOutcome: string;
  timeline: string;
  budget: string;
  stakeholders: string;
  howHeard: string;
  privacyConsent: boolean;
  honeypot: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  role: '',
  organisation: '',
  email: '',
  telephone: '',
  country: '',
  projectLocation: '',
  organisationType: '',
  serviceRequired: '',
  description: '',
  projectStage: '',
  desiredOutcome: '',
  timeline: '',
  budget: '',
  stakeholders: '',
  howHeard: '',
  privacyConsent: false,
  honeypot: '',
};

export default function ProjectInquiryForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ referenceId: string; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState('');
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear specific field error on edit
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string[]> = {};

    if (step === 1) {
      if (!formData.name.trim()) errors.name = ['Full name is required'];
      if (!formData.role.trim()) errors.role = ['Role / title is required'];
      if (!formData.organisation.trim()) errors.organisation = ['Organisation is required'];
      if (!formData.email.trim() || !formData.email.includes('@')) errors.email = ['Valid email is required'];
      if (!formData.country.trim()) errors.country = ['Country is required'];
    } else if (step === 2) {
      if (!formData.projectLocation.trim()) errors.projectLocation = ['City / Region is required'];
      if (!formData.organisationType) errors.organisationType = ['Please select organisation type'];
      if (!formData.serviceRequired) errors.serviceRequired = ['Please select primary service required'];
      if (formData.description.trim().length < 20) {
        errors.description = ['Please provide at least 20 characters describing the assignment'];
      }
    } else if (step === 3) {
      if (!formData.privacyConsent) {
        errors.privacyConsent = ['You must accept the confidentiality and privacy terms'];
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    setGeneralError('');

    try {
      const res = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
          setGeneralError('Please review the highlighted fields below.');
        } else {
          throw new Error(data.error || 'Failed to submit inquiry');
        }
        return;
      }

      setSuccessData({
        referenceId: data.referenceId,
        message: data.message,
      });
      setFormData(INITIAL_FORM);
    } catch (err: any) {
      setGeneralError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success Confirmation Card
  if (successData) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-brand-green-muted text-brand-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 size={44} />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-brand-green bg-brand-green-muted px-4 py-1.5 rounded-full inline-block mb-4">
          Mandate Successfully Registered
        </span>

        <h3 className="text-3xl sm:text-4xl font-extrabold text-charcoal mb-4 tracking-tight">
          Advisory Brief Received
        </h3>

        <p className="text-base sm:text-lg text-charcoal/70 max-w-xl mx-auto leading-relaxed mb-8">
          Thank you for trusting SportLead Africa. Your project specifications have been submitted to our senior practice leadership.
        </p>

        {/* Reference & SLA Box */}
        <div className="bg-warm-gray rounded-2xl p-6 max-w-lg mx-auto mb-8 border border-warm-border text-left">
          <div className="flex items-center justify-between pb-4 border-b border-warm-border/60 mb-4">
            <span className="text-xs font-semibold uppercase text-gray-500">Inquiry Reference</span>
            <span className="font-mono text-xs sm:text-sm font-bold text-brand-green">
              {successData.referenceId}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} className="text-brand-green mt-0.5 shrink-0" />
            <div className="text-xs text-charcoal/80 leading-relaxed">
              <strong>Technical Review Timeline:</strong> Our practice team reviews all briefs within <strong>48 business hours</strong>. A confirmation receipt has been dispatched to your email address.
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setSuccessData(null);
            setCurrentStep(1);
          }}
          className="rounded-full px-8 py-3 border-2 border-charcoal/20 text-charcoal hover:border-charcoal text-sm font-bold"
        >
          Submit Another Project Brief
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Multi-Step Visual Progress Bar */}
      <div className="mb-10 pb-8 border-b border-warm-border/80">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {[
            { num: 1, label: 'Client Profile', icon: Building2 },
            { num: 2, label: 'Project Scope', icon: Layers },
            { num: 3, label: 'Timeline & Review', icon: FileText },
          ].map((step, idx) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const Icon = step.icon;

            return (
              <div key={step.num} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                    isCompleted
                      ? 'bg-brand-green text-white'
                      : isCurrent
                      ? 'bg-brand-green-muted text-brand-green ring-2 ring-brand-green ring-offset-2'
                      : 'bg-warm-gray text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={16} />}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
                    Step 0{step.num}
                  </span>
                  <span className={`text-xs font-semibold ${isCurrent ? 'text-charcoal' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${currentStep > step.num ? 'bg-brand-green' : 'bg-warm-border'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {generalError && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Anti-spam Honeypot */}
        <input
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* STEP 1: Client & Institutional Coordinates */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-charcoal mb-2">
                1. Institutional &amp; Contact Coordinates
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Please provide your official contact details and the institution or sponsor initiating this brief.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Dr. Kwame Mensah"
                required
                error={fieldErrors.name?.[0]}
              />
              <FormField
                label="Role / Title"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Director of Infrastructure / General Secretary"
                required
                error={fieldErrors.role?.[0]}
              />
              <FormField
                label="Organisation / Entity"
                name="organisation"
                value={formData.organisation}
                onChange={handleChange}
                placeholder="e.g. National Football Federation / State Ministry"
                required
                error={fieldErrors.organisation?.[0]}
              />
              <FormField
                label="Official Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. kmensah@federation.org"
                required
                error={fieldErrors.email?.[0]}
              />
              <FormField
                label="Telephone / WhatsApp (with Country Code)"
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="e.g. +234 803 000 0000"
                error={fieldErrors.telephone?.[0]}
              />
              <FormField
                label="Country of Operation"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g. Ghana, Kenya, Nigeria"
                required
                error={fieldErrors.country?.[0]}
              />
            </div>

            <div className="pt-8 flex justify-end">
              <Button
                type="button"
                variant="primary"
                onClick={handleNext}
                className="bg-brand-green text-white hover:bg-brand-green-light rounded-full px-8 py-3.5 font-bold text-sm inline-flex items-center gap-2"
              >
                <span>Continue to Project Scope</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Project Scope & Technical Parameters */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-charcoal mb-2">
                2. Project Parameters &amp; Technical Requirements
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Detail the facility, institutional assignment, or strategic mandate you wish to develop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="City / Project Location"
                name="projectLocation"
                value={formData.projectLocation}
                onChange={handleChange}
                placeholder="e.g. Kumasi, Lagos, Nairobi"
                required
                error={fieldErrors.projectLocation?.[0]}
              />
              <FormField
                label="Organisation Type"
                name="organisationType"
                type="select"
                value={formData.organisationType}
                onChange={handleChange}
                options={ORGANISATION_TYPES.map(t => ({ label: t, value: t }))}
                required
                error={fieldErrors.organisationType?.[0]}
              />
            </div>

            <FormField
              label="Primary Practice Service Required"
              name="serviceRequired"
              type="select"
              value={formData.serviceRequired}
              onChange={handleChange}
              options={SERVICE_OPTIONS.map(t => ({ label: t, value: t }))}
              required
              error={fieldErrors.serviceRequired?.[0]}
            />

            <FormField
              label="Brief Description of Project, Challenge or Facility Need"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please describe the facility type (e.g. 20,000-seat stadium, multi-court arena), the current condition, regulatory standards needed (e.g. CAF Category 3), or the institutional reform mandate..."
              required
              rows={5}
              error={fieldErrors.description?.[0]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Current Project Stage"
                name="projectStage"
                type="select"
                value={formData.projectStage}
                onChange={handleChange}
                options={PROJECT_STAGES.map(s => ({ label: s, value: s }))}
                placeholder="Select project stage"
              />
              <FormField
                label="Key Stakeholders Involved"
                name="stakeholders"
                value={formData.stakeholders}
                onChange={handleChange}
                placeholder="e.g. Ministry, Continental Confederation, Private Partner"
              />
            </div>

            <div className="pt-8 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="rounded-full px-6 py-3 border border-warm-border text-charcoal hover:bg-warm-gray text-sm font-semibold inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleNext}
                className="bg-brand-green text-white hover:bg-brand-green-light rounded-full px-8 py-3.5 font-bold text-sm inline-flex items-center gap-2"
              >
                <span>Continue to Timeline &amp; Review</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Timeline, Budget & Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-charcoal mb-2">
                3. Delivery Horizon &amp; Advisory Confirmation
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Help us understand your delivery target and budget parameters for practice team allocation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Anticipated Project Timeline"
                name="timeline"
                type="select"
                value={formData.timeline}
                onChange={handleChange}
                options={TIMELINE_OPTIONS.map(o => ({ label: o, value: o }))}
                placeholder="Select timeline"
              />
              <FormField
                label="Estimated Budget Envelope (CAPEX / Advisory)"
                name="budget"
                type="select"
                value={formData.budget}
                onChange={handleChange}
                options={BUDGET_RANGES.map(b => ({ label: b, value: b }))}
                placeholder="Select estimated range"
              />
            </div>

            <FormField
              label="Desired Tangible Outcome"
              name="desiredOutcome"
              type="textarea"
              value={formData.desiredOutcome}
              onChange={handleChange}
              placeholder="e.g. CAF Category 3 approval before tournament qualifier, bankable PPP feasibility deck for private lenders, adopted statutory constitution..."
              rows={3}
            />

            {/* Confidentiality & Reassurance Box */}
            <div className="bg-warm-gray rounded-2xl p-5 border border-warm-border space-y-3">
              <div className="flex items-center gap-2 text-brand-green font-bold text-xs uppercase tracking-wider">
                <ShieldCheck size={16} />
                <span>Confidentiality &amp; NDA Protocol</span>
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                All submitted data is treated under strict advisory confidentiality. We execute mutual Non-Disclosure Agreements (NDAs) prior to detailed scoping sessions on request.
              </p>
            </div>

            {/* Privacy Checkbox */}
            <div className="pt-2">
              <FormField
                label="I confirm the accuracy of this brief and authorize SportLead Africa to review our project data under confidentiality standards."
                name="privacyConsent"
                type="checkbox"
                value={formData.privacyConsent}
                onChange={handleChange}
                required
                error={fieldErrors.privacyConsent?.[0]}
              />
            </div>

            <div className="pt-8 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={loading}
                className="rounded-full px-6 py-3 border border-warm-border text-charcoal hover:bg-warm-gray text-sm font-semibold inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="bg-brand-green text-white hover:bg-brand-green-light rounded-full px-10 py-4 font-bold text-sm inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                {loading ? (
                  <span>Registering Mandate...</span>
                ) : (
                  <>
                    <span>Submit Mandate Brief</span>
                    <Send size={16} />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
