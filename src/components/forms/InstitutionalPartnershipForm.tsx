'use client';

import { useState } from 'react';
import { Button, FormField, PhoneField } from '@/components/ui';
import { COUNTRY_OPTIONS, updatePhoneWithCountry } from '@/lib/countries';
import { useFormDraft } from '@/lib/useFormDraft';
import { CheckCircle2, Send, AlertCircle, Clock, Upload, FileText } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const INSTITUTION_TYPES = [
  'University or higher education institution',
  'National sport federation or association',
  'Continental or regional governing body',
  'Government ministry or statutory agency',
  'Non-governmental organisation (NGO) / Development body',
  'Professional body / Chartered institute',
  'Other',
];

const COLLABORATION_AREAS = [
  'Sport governance frameworks & institutional reform',
  'Academic research & sector analysis',
  'Sport infrastructure standards & facility guidelines',
  'Capacity building & executive training',
  'Technical advisory & project delivery',
  'Other multidisciplinary collaboration',
];

const DURATION_OPTIONS = [
  'Short-term (less than 12 months)',
  '1 to 2 years',
  '3 to 5 years',
  'Long-term / Multi-year standing agreement',
  'Project-specific duration',
];

interface FormState {
  institutionName: string;
  institutionType: string;
  contactPerson: string;
  role: string;
  email: string;
  telephone: string;
  country: string;
  collaborationArea: string;
  objectives: string;
  duration: string;
  existingInitiative: string;
  message: string;
  documentName: string;
  privacyConsent: boolean;
  honeypot: string;
}

const INITIAL_FORM: FormState = {
  institutionName: '',
  institutionType: '',
  contactPerson: '',
  role: '',
  email: '',
  telephone: '',
  country: '',
  collaborationArea: '',
  objectives: '',
  duration: '',
  existingInitiative: '',
  message: '',
  documentName: '',
  privacyConsent: false,
  honeypot: '',
};

export default function InstitutionalPartnershipForm() {
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
  } = useFormDraft<FormState>('sportlead_draft_institutional_partnership', INITIAL_FORM);

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
    if (!formData.institutionName.trim()) errors.institutionName = ['Institution name is required'];
    if (!formData.institutionType.trim()) errors.institutionType = ['Please select institution type'];
    if (!formData.contactPerson.trim()) errors.contactPerson = ['Contact person name is required'];
    if (!formData.role.trim()) errors.role = ['Role or title is required'];
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = ['Valid email address is required'];
    if (!formData.country.trim()) errors.country = ['Country is required'];
    if (!formData.collaborationArea.trim()) errors.collaborationArea = ['Please select collaboration area'];
    if (formData.objectives.trim().length < 10) errors.objectives = ['Please describe proposed objectives (at least 10 characters)'];
    if (!formData.duration.trim()) errors.duration = ['Please select expected duration'];
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

      const res = await fetch('/api/institutional-partnership', {
        method: 'POST',
        body: submitData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
          setGeneralError('Please review the highlighted fields below.');
        } else {
          throw new Error(data.error || 'Failed to submit institutional partnership inquiry');
        }
        return;
      }

      setSuccessData({
        referenceId: data.referenceId,
        message: data.message,
      });
      trackEvent('Institutional Partnership Submitted', { referenceId: data.referenceId });
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
          Institutional Partnership Inquiry Received
        </h2>

        <p className="text-base sm:text-lg text-charcoal/70 max-w-xl mx-auto leading-relaxed mb-8">
          Thank you. A practice specialist will follow up to discuss institutional partnership opportunities.
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
              Our institutional advisory practice will review your partnership objectives and initiate a structured consultation.
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
          Institutional Partnerships
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          For universities, associations, federations, government institutions, NGOs, professional bodies and other organisations interested in longer term collaboration with SportLead Africa.
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

        {/* Institution Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Institution Name"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            placeholder="e.g. National Olympic Committee / University of Ghana"
            required
            error={fieldErrors.institutionName?.[0]}
          />
          <FormField
            label="Institution Type"
            name="institutionType"
            type="select"
            options={INSTITUTION_TYPES.map((t) => ({ label: t, value: t }))}
            value={formData.institutionType}
            onChange={handleChange}
            placeholder="Select institution type"
            required
            error={fieldErrors.institutionType?.[0]}
          />
        </div>

        {/* Contact Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Contact Person"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="e.g. Prof. Emmanuel Boateng"
            required
            error={fieldErrors.contactPerson?.[0]}
          />
          <FormField
            label="Role or Title"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Registrar / Director of Sports Administration"
            required
            error={fieldErrors.role?.[0]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Official Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. eboateng@institution.edu"
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
            placeholder="Select Country of Institution"
            required
            error={fieldErrors.country?.[0]}
          />
          <FormField
            label="Collaboration Area"
            name="collaborationArea"
            type="select"
            options={COLLABORATION_AREAS.map((a) => ({ label: a, value: a }))}
            value={formData.collaborationArea}
            onChange={handleChange}
            placeholder="Select primary collaboration area"
            required
            error={fieldErrors.collaborationArea?.[0]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Expected Duration"
            name="duration"
            type="select"
            options={DURATION_OPTIONS.map((d) => ({ label: d, value: d }))}
            value={formData.duration}
            onChange={handleChange}
            placeholder="Select expected partnership duration"
            required
            error={fieldErrors.duration?.[0]}
          />
          <FormField
            label="Existing Initiative or Project (Optional)"
            name="existingInitiative"
            value={formData.existingInitiative}
            onChange={handleChange}
            placeholder="e.g. National Sport Policy Review, Sports Academy Initiative"
          />
        </div>

        <FormField
          label="Proposed Objectives"
          name="objectives"
          type="textarea"
          rows={4}
          value={formData.objectives}
          onChange={handleChange}
          placeholder="Please outline the core objectives, institutional milestones, or systemic outcomes you wish to accomplish through this partnership..."
          required
          error={fieldErrors.objectives?.[0]}
        />

        <FormField
          label="Message"
          name="message"
          type="textarea"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please provide any additional context, governance parameters, or procedural considerations..."
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
            Upload institutional charters, concept notes, draft memoranda of understanding, or initiative briefs (PDF, DOC, DOCX up to 10MB).
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
            label="I confirm that SportLead Africa may securely store and process this information to evaluate institutional partnership collaboration."
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
                <span>Discuss an Institutional Partnership</span>
                <Send size={15} />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
