'use client';

import { useState } from 'react';
import { Button, FormField } from '@/components/ui';
import { ORGANISATION_TYPES, SERVICE_OPTIONS, PROJECT_STAGES, BUDGET_RANGES, TIMELINE_OPTIONS } from '@/lib/constants';

export default function ProjectInquiryForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
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
    honeypot: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (formData.honeypot) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to submit inquiry');
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-brand-navy-light p-12 rounded-3xl border border-white/5 text-center">
        <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">Inquiry Received</h3>
        <p className="text-gray-300 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
          Thank you for sharing your project details with SportLead Africa. Our technical team will review your requirements and contact you shortly to discuss the next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-brand-navy-light p-8 md:p-12 rounded-3xl border border-white/5">
      {error && (
        <div className="mb-8 p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="hidden">
          <input name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
        </div>

        {/* Section 1 */}
        <div>
          <h4 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-8">1. Your Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
            <FormField label="Role / Title" name="role" value={formData.role} onChange={handleChange} required />
            <FormField label="Organisation" name="organisation" value={formData.organisation} onChange={handleChange} required />
            <FormField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <FormField label="Telephone" type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h4 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-8">2. Project Location</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Country" name="country" value={formData.country} onChange={handleChange} required />
            <FormField label="City / Region" name="projectLocation" value={formData.projectLocation} onChange={handleChange} required />
            <FormField 
              label="Organisation Type" 
              name="organisationType" 
              type="select"
              value={formData.organisationType} 
              onChange={handleChange}
              options={ORGANISATION_TYPES.map(t => ({ label: t, value: t }))}
              required
              className="md:col-span-2"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <h4 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-8">3. Project Details</h4>
          <div className="space-y-6">
            <FormField 
              label="Primary Service Required" 
              name="serviceRequired" 
              type="select"
              value={formData.serviceRequired} 
              onChange={handleChange}
              options={SERVICE_OPTIONS.map(t => ({ label: t, value: t }))}
              required
            />
            <FormField 
              label="Brief Description of the Project or Challenge" 
              name="description" 
              type="textarea"
              value={formData.description} 
              onChange={handleChange}
              rows={4}
              required
            />
            <FormField 
              label="Current Project Stage" 
              name="projectStage" 
              type="select"
              value={formData.projectStage} 
              onChange={handleChange}
              options={PROJECT_STAGES.map(t => ({ label: t, value: t }))}
              required
            />
            <FormField 
              label="Desired Outcome or Goal" 
              name="desiredOutcome" 
              type="textarea"
              value={formData.desiredOutcome} 
              onChange={handleChange}
              rows={3}
              required
            />
          </div>
        </div>

        {/* Section 4 */}
        <div>
          <h4 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-8">4. Timeline & Budget</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="Indicative Timeline" 
              name="timeline" 
              type="select"
              value={formData.timeline} 
              onChange={handleChange}
              options={TIMELINE_OPTIONS.map(t => ({ label: t, value: t }))}
              required
            />
            <FormField 
              label="Budget Range (Optional)" 
              name="budget" 
              type="select"
              value={formData.budget} 
              onChange={handleChange}
              options={BUDGET_RANGES.map(t => ({ label: t, value: t }))}
            />
            <div className="md:col-span-2">
              <FormField 
                label="Key Stakeholders Involved" 
                name="stakeholders" 
                type="textarea"
                value={formData.stakeholders} 
                onChange={handleChange}
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div>
          <h4 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-8">5. Additional Information</h4>
          <div className="space-y-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-white mb-2">Supporting Document (Upload placeholder for now)</label>
              <input type="file" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer" disabled />
              <p className="text-xs text-gray-500 mt-2">File upload will be implemented in the next phase.</p>
            </div>
            
            <FormField 
              label="How did you hear about SportLead Africa?" 
              name="howHeard" 
              value={formData.howHeard} 
              onChange={handleChange}
            />

            <div className="flex items-start pt-4">
              <div className="flex items-center h-5">
                <input 
                  id="privacyConsent" 
                  name="privacyConsent" 
                  type="checkbox" 
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  required
                  className="w-5 h-5 rounded border-white/20 text-brand-gold focus:ring-brand-gold bg-brand-navy-light cursor-pointer" 
                />
              </div>
              <div className="ml-3 text-sm pt-0.5">
                <label htmlFor="privacyConsent" className="text-gray-300 font-medium cursor-pointer">
                  I consent to having SportLead Africa store and process my submitted information to evaluate this project inquiry.
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <Button variant="primary" type="submit" disabled={loading} className="w-full md:w-auto px-10 py-3 text-lg font-bold bg-brand-gold text-brand-navy hover:bg-brand-gold-light rounded-full">
            {loading ? 'Submitting Inquiry...' : 'Submit Project Inquiry'}
          </Button>
        </div>
      </form>
    </div>
  );
}
