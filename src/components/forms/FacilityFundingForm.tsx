'use client';

import { useState } from 'react';
import { Button, FormField, PhoneField } from '@/components/ui';
import { BUDGET_RANGES, TIMELINE_OPTIONS } from '@/lib/constants';
import { COUNTRY_OPTIONS, updatePhoneWithCountry } from '@/lib/countries';
import { useFormDraft } from '@/lib/useFormDraft';
import { CheckCircle2, Send, AlertCircle, Clock, Upload, FileText } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const SUPPORT_TYPES = [
  'Grant / Non-repayable funding',
  'Equity investment / Direct capital',
  'Concessionary / Development finance',
  'Technical sponsorship / Equipment',
  'Public-Private Partnership (PPP) co-financing',
  'Other',
];

const PARTNERSHIP_MODELS = [
  'Public-Private Partnership (PPP)',
  'Direct grant or endowment',
  'Joint venture / Co-development',
  'Build-Operate-Transfer (BOT) / Concession',
  'Corporate social investment (CSI)',
  'Open to discussion',
];

interface FormState {
  organisationName: string;
  contactPerson: string;
  email: string;
  telephone: string;
  country: string;
  geographicArea: string;
  facilityType: string;
  intendedSupport: string;
  fundingRange: string;
  partnershipModel: string;
  timeline: string;
  message: string;
  documentName: string;
  privacyConsent: boolean;
  honeypot: string;
}

const INITIAL_FORM: FormState = {
  organisationName: '',
  contactPerson: '',
  email: '',
  telephone: '',
  country: '',
  geographicArea: '',
  facilityType: '',
  intendedSupport: '',
  fundingRange: '',
  partnershipModel: '',
  timeline: '',
  message: '',
  documentName: '',
  privacyConsent: false,
  honeypot: '',
};

export default function FacilityFundingForm() {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ referenceId: string; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState('');
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const {
    formData,
    setFormData,
    isRestored,
    clearDraft,
  } = useFormDraft<FormState>('sportlead_draft_facility_funding', INITIAL_FORM);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => {
      if (name === 'country') {
        const updatedPhone = updatePhoneWithCountry(prev.telephone, value, prev.country);
        return {
          ...prev,
          country: value,
          telephone: updatedPhone,
        };
      }
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setDocumentFile(null);
      setFormData((prev) => ({ ...prev, documentName: '' }));
      return;
    }
    const file = files[0];
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(ext)) {
      setFieldErrors((prev) => ({ ...prev, documentFile: ['Document must be a PDF, DOC, or DOCX file'] }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFieldErrors((prev) => ({ ...prev, documentFile: ['File size must not exceed 10MB'] }));
      return;
    }
    setDocumentFile(file);
    setFormData((prev) => ({ ...prev, documentName: file.name }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.documentFile;
      return next;
    });
  };

  const validate = (): boolean => {
    const errors: Record<string, string[]> = {};
    if (!formData.organisationName.trim()) errors.organisationName = ['Organisation or funder name is required'];
    if (!formData.contactPerson.trim()) errors.contactPerson = ['Contact person name is required'];
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = ['Valid email address is required'];
    if (!formData.country.trim()) errors.country = ['Country is required'];
    if (!formData.geographicArea.trim()) errors.geographicArea = ['Geographic area of interest is required'];
    if (!formData.facilityType.trim()) errors.facilityType = ['Type of facility or project is required'];
    if (!formData.intendedSupport.trim()) errors.intendedSupport = ['Please select intended form of support'];
    if (!formData.partnershipModel.trim()) errors.partnershipModel = ['Please select preferred partnership model'];
    if (!formData.timeline.trim()) errors.timeline = ['Please select estimated timeline'];
    if (formData.message.trim().length < 10) errors.message = ['Please provide a message of at least 10 characters'];
    if (!formData.privacyConsent) errors.privacyConsent = ['You must accept the privacy terms'];

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setGeneralError('');

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        submitData.append(key, String(val));
      });
      if (documentFile) {
        submitData.append('documentFile', documentFile);
      }

      const res = await fetch('/api/facility-funding', {
        method: 'POST',
        body: submitData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
          setGeneralError('Please review the highlighted fields below.');
        } else {
          throw new Error(data.error || 'Failed to submit facility funding inquiry');
        }
        return;
      }

      setSuccessData({
        referenceId: data.referenceId,
        message: data.message,
      });
      trackEvent('Facility Funding Submitted', { referenceId: data.referenceId });
      clearDraft();
      setFormData(INITIAL_FORM);
      setDocumentFile(null);
    } catch (err: any) {
      setGeneralError(err.message || 'An unexpected error occurred. Please try again.');
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
          Inquiry Received
        </span>

        <h2 className="text-3xl font-extrabold text-charcoal mb-4 tracking-tight">
          Facility Funding Inquiry Received
        </h2>

        <p className="text-base sm:text-lg text-charcoal/70 max-w-xl mx-auto leading-relaxed mb-8">
          Thank you. A practice specialist will follow up to discuss facility funding opportunities.
        </p>

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
              A practice specialist will review your proposed facility funding mandate and follow up directly.
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setSuccessData(null)}
          className="rounded-full px-8 py-3 border-2 border-charcoal/20 text-charcoal hover:border-charcoal text-sm font-bold"
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-10 md:p-12 rounded-3xl border border-warm-border shadow-card">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal mb-2 tracking-tight">
          Fund a Facility Project
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          For companies, foundations, philanthropists, investors and other funders interested in supporting a defined sport facility or infrastructure project.
        </p>
      </div>

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
              setFormData(INITIAL_FORM);
            }}
            className="text-xs font-bold uppercase tracking-wider hover:underline text-brand-green-dark"
          >
            Clear Draft
          </button>
        </div>
      )}

      {generalError && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anti-spam honeypot */}
        <input
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Organisation & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Organisation or Funder Name"
            name="organisationName"
            value={formData.organisationName}
            onChange={handleChange}
            placeholder="e.g. Acme Foundation / Pan-African Infrastructure Fund"
            required
            error={fieldErrors.organisationName?.[0]}
          />
          <FormField
            label="Contact Person"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="e.g. Sarah Mensah"
            required
            error={fieldErrors.contactPerson?.[0]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Official Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. smensah@funder.org"
            required
            error={fieldErrors.email?.[0]}
          />
          <PhoneField
            label="Telephone / WhatsApp"
            name="telephone"
            value={formData.telephone}
            selectedCountry={formData.country}
            onChange={handleChange}
            placeholder="800 000 0000"
            error={fieldErrors.telephone?.[0]}
            helpText="Country code auto-selects with country or choose manually"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Country"
            name="country"
            type="select"
            options={COUNTRY_OPTIONS}
            value={formData.country}
            onChange={handleChange}
            placeholder="Select Country of Residence / Headquarters"
            required
            error={fieldErrors.country?.[0]}
          />
          <FormField
            label="Geographic Area of Interest"
            name="geographicArea"
            value={formData.geographicArea}
            onChange={handleChange}
            placeholder="e.g. West Africa, Kenya, Nigeria, Pan-African"
            required
            error={fieldErrors.geographicArea?.[0]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Type of Facility or Project"
            name="facilityType"
            value={formData.facilityType}
            onChange={handleChange}
            placeholder="e.g. Community multi-sport arena, stadium refurbishment"
            required
            error={fieldErrors.facilityType?.[0]}
          />
          <FormField
            label="Intended Form of Support"
            name="intendedSupport"
            type="select"
            options={SUPPORT_TYPES.map((s) => ({ label: s, value: s }))}
            value={formData.intendedSupport}
            onChange={handleChange}
            placeholder="Select form of support"
            required
            error={fieldErrors.intendedSupport?.[0]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Indicative Funding Range (Optional)"
            name="fundingRange"
            type="select"
            options={BUDGET_RANGES.map((b) => ({ label: b, value: b }))}
            value={formData.fundingRange}
            onChange={handleChange}
            placeholder="Select indicative funding range"
          />
          <FormField
            label="Preferred Partnership Model"
            name="partnershipModel"
            type="select"
            options={PARTNERSHIP_MODELS.map((m) => ({ label: m, value: m }))}
            value={formData.partnershipModel}
            onChange={handleChange}
            placeholder="Select partnership model"
            required
            error={fieldErrors.partnershipModel?.[0]}
          />
        </div>

        <FormField
          label="Timeline"
          name="timeline"
          type="select"
          options={TIMELINE_OPTIONS.map((t) => ({ label: t, value: t }))}
          value={formData.timeline}
          onChange={handleChange}
          placeholder="Select anticipated timeline"
          required
          error={fieldErrors.timeline?.[0]}
        />

        <FormField
          label="Message"
          name="message"
          type="textarea"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe your funding mandate, target communities or athletes, and key project expectations..."
          required
          error={fieldErrors.message?.[0]}
        />

        {/* Supporting Document Upload (Optional) */}
        <div className="bg-warm-gray rounded-2xl p-6 border border-warm-border space-y-3">
          <label className="text-sm font-semibold text-charcoal flex items-center gap-2">
            <Upload size={16} className="text-brand-green" />
            <span>Supporting Document Upload (Optional)</span>
          </label>
          <p className="text-xs text-gray-500">
            Upload investment guidelines, request for proposals, facility briefs, or partnership frameworks (PDF, DOC, DOCX up to 10MB).
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleDocumentChange}
            className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-green file:text-white hover:file:bg-brand-green-light cursor-pointer border border-warm-border rounded-xl p-2 bg-white"
          />
          {documentFile && (
            <p className="text-xs text-brand-green font-medium flex items-center gap-1.5 pt-1">
              <FileText size={14} /> Selected: {documentFile.name} ({(documentFile.size / 1024).toFixed(0)} KB)
            </p>
          )}
          {fieldErrors.documentFile && (
            <p className="text-xs text-red-500 font-medium">{fieldErrors.documentFile[0]}</p>
          )}
        </div>

        {/* Privacy Consent */}
        <div className="pt-2">
          <FormField
            label="I confirm that SportLead Africa may securely store and process this information to evaluate facility funding collaboration opportunities."
            name="privacyConsent"
            type="checkbox"
            value={formData.privacyConsent}
            onChange={handleChange}
            required
            error={fieldErrors.privacyConsent?.[0]}
          />
        </div>

        <div className="pt-4">
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-brand-green text-white hover:bg-brand-green-light font-bold rounded-full px-10 py-3.5 text-sm inline-flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? (
              <span>Submitting Details...</span>
            ) : (
              <>
                <span>Discuss Facility Funding</span>
                <Send size={15} />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
