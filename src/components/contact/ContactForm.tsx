'use client';

import { useState } from 'react';
import { Button, FormField, PhoneField } from '@/components/ui';
import { INQUIRY_TYPES } from '@/lib/constants';
import { COUNTRY_OPTIONS, updatePhoneWithCountry } from '@/lib/countries';
import { useFormDraft } from '@/lib/useFormDraft';
import { CheckCircle2, Send, AlertCircle, Clock, Shield } from 'lucide-react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ referenceId: string; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState('');

  const INITIAL_CONTACT_FORM = {
    name: '',
    organisation: '',
    role: '',
    email: '',
    telephone: '',
    country: '',
    inquiryType: INQUIRY_TYPES[0] || 'General Inquiry',
    subject: '',
    message: '',
    preferredContact: 'Email' as 'Email' | 'Phone' | 'WhatsApp',
    privacyConsent: false,
    honeypot: '',
  };

  const {
    formData,
    setFormData,
    isRestored,
    clearDraft,
  } = useFormDraft('sportlead_draft_contact', INITIAL_CONTACT_FORM);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => {
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
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError('');
    setFieldErrors({});

    try {
      const res = await fetch('/api/contact', {
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
          throw new Error(data.error || 'Failed to send message');
        }
        return;
      }

      setSuccessData({
        referenceId: data.referenceId,
        message: data.message,
      });
      clearDraft();
      setFormData(INITIAL_CONTACT_FORM);
    } catch (err: any) {
      setGeneralError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-warm-border shadow-card text-center">
        <div className="w-16 h-16 bg-brand-green-muted text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-3 tracking-tight">
          Inquiry Successfully Dispatched
        </h3>
        <p className="text-sm sm:text-base text-charcoal/70 mb-6 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to SportLead Africa. Our team has received your message and will respond via your preferred contact channel.
        </p>

        <div className="bg-warm-gray rounded-2xl p-4 max-w-sm mx-auto mb-8 border border-warm-border text-xs text-charcoal/80 flex items-center justify-between">
          <span className="font-semibold text-gray-500 uppercase">Reference ID</span>
          <span className="font-mono font-bold text-brand-green">{successData.referenceId.slice(0, 13)}...</span>
        </div>

        <Button
          variant="outline"
          onClick={() => setSuccessData(null)}
          className="rounded-full px-8 py-2.5 border border-brand-green text-brand-green hover:bg-brand-green-muted text-sm font-semibold"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-10 md:p-12 rounded-3xl border border-warm-border shadow-card">
      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal mb-2 tracking-tight">
          Send Us an Inquiry
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">
          Our communications team responds to all institutional and public inquiries promptly.
        </p>
      </div>

      {isRestored && (
        <div className="mb-6 px-5 py-3.5 bg-brand-green-muted border border-brand-green/20 rounded-2xl text-brand-green text-xs sm:text-sm flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span>Draft restored from your last visit.</span>
          </div>
          <button
            type="button"
            onClick={() => {
              clearDraft();
              setFormData(INITIAL_CONTACT_FORM);
            }}
            className="text-xs font-bold uppercase tracking-wider hover:underline text-brand-green-dark"
          >
            Clear Draft
          </button>
        </div>
      )}

      {generalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot */}
        <input
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Samuel Adeyemi"
            required
            error={fieldErrors.name?.[0]}
          />
          <FormField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. adeyemi@organisation.org"
            required
            error={fieldErrors.email?.[0]}
          />
          <FormField
            label="Organisation / Entity"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            placeholder="e.g. Sports Commission / Club"
            error={fieldErrors.organisation?.[0]}
          />
          <FormField
            label="Role / Title"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Managing Director"
            error={fieldErrors.role?.[0]}
          />
          <FormField
            label="Country of Operation"
            name="country"
            type="select"
            options={COUNTRY_OPTIONS}
            value={formData.country}
            onChange={handleChange}
            placeholder="Select African Country of Operation"
            error={fieldErrors.country?.[0]}
          />
          <PhoneField
            label="Telephone / WhatsApp"
            name="telephone"
            value={formData.telephone}
            selectedCountry={formData.country}
            onChange={handleChange}
            placeholder="803 000 0000"
            error={fieldErrors.telephone?.[0]}
            helpText="Country code auto-selects with African country or choose manually"
          />
        </div>

        <FormField
          label="Inquiry Type"
          name="inquiryType"
          type="select"
          value={formData.inquiryType}
          onChange={handleChange}
          options={INQUIRY_TYPES.map(t => ({ label: t, value: t }))}
          required
          error={fieldErrors.inquiryType?.[0]}
        />

        <FormField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. CAF Category 3 Stadium Audit Inquiry"
          required
          error={fieldErrors.subject?.[0]}
        />

        <FormField
          label="Message"
          name="message"
          type="textarea"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe how we can assist your organisation or project..."
          required
          rows={5}
          error={fieldErrors.message?.[0]}
        />

        <FormField
          label="Preferred Contact Channel"
          name="preferredContact"
          type="select"
          value={formData.preferredContact}
          onChange={handleChange}
          options={[
            { label: 'Email', value: 'Email' },
            { label: 'Phone', value: 'Phone' },
            { label: 'WhatsApp', value: 'WhatsApp' },
          ]}
        />

        <div className="pt-2">
          <FormField
            label="I consent to having SportLead Africa securely store my submitted contact information to respond to this inquiry."
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
              <span>Sending Message...</span>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={15} />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
