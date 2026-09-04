'use client';

import { useState } from 'react';
import { Button, FormField } from '@/components/ui';
import { INQUIRY_TYPES } from '@/lib/constants';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    role: '',
    email: '',
    telephone: '',
    country: '',
    inquiryType: '',
    subject: '',
    message: '',
    preferredContact: 'Email',
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to send message');
      
      setSuccess(true);
      setFormData({
        name: '',
        organisation: '',
        role: '',
        email: '',
        telephone: '',
        country: '',
        inquiryType: '',
        subject: '',
        message: '',
        preferredContact: 'Email',
        privacyConsent: false,
        honeypot: ''
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-warm-border shadow-card text-center">
        <div className="w-20 h-20 bg-brand-green-muted text-brand-green rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-3xl font-bold text-charcoal mb-4 tracking-tight">Message Sent</h3>
        <p className="text-gray-500 mb-10 text-lg">Thank you for contacting SportLead Africa. We have received your message and will respond shortly.</p>
        <Button variant="outline" onClick={() => setSuccess(false)} className="border-brand-green text-brand-green hover:bg-brand-green-muted rounded-full px-8 py-2.5">Send Another Message</Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl border border-warm-border shadow-card">
      <h3 className="text-3xl font-bold text-charcoal mb-8 tracking-tight">Send us a message</h3>
      
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot */}
        <div className="hidden">
          <label>Don't fill this out if you're human: <input name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <FormField label="Organisation" name="organisation" value={formData.organisation} onChange={handleChange} />
          <FormField label="Role / Title" name="role" value={formData.role} onChange={handleChange} />
          <FormField label="Telephone" type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
          <FormField label="Country" name="country" value={formData.country} onChange={handleChange} />
        </div>

        <FormField 
          label="Inquiry Type" 
          name="inquiryType" 
          type="select"
          value={formData.inquiryType} 
          onChange={handleChange}
          options={INQUIRY_TYPES.map(t => ({ label: t, value: t }))}
          required 
        />
        
        <FormField label="Subject" name="subject" value={formData.subject} onChange={handleChange} required />
        
        <FormField 
          label="Message" 
          name="message" 
          type="textarea"
          value={formData.message} 
          onChange={handleChange}
          required 
          rows={5}
        />

        <FormField 
          label="Preferred Contact Method" 
          name="preferredContact" 
          type="select"
          value={formData.preferredContact} 
          onChange={handleChange}
          options={[
            { label: 'Email', value: 'Email' },
            { label: 'Phone', value: 'Phone' },
            { label: 'WhatsApp', value: 'WhatsApp' }
          ]}
        />

        <div className="flex items-start pt-2">
          <div className="flex items-center h-5">
            <input 
              id="privacyConsent" 
              name="privacyConsent" 
              type="checkbox" 
              checked={formData.privacyConsent}
              onChange={handleChange}
              required
              className="w-5 h-5 rounded border-gray-300 text-brand-green focus:ring-brand-green bg-white cursor-pointer" 
            />
          </div>
          <div className="ml-3 text-sm pt-0.5">
            <label htmlFor="privacyConsent" className="text-gray-500 font-medium cursor-pointer">
              I consent to having SportLead Africa store my submitted information so they can respond to my inquiry.
            </label>
          </div>
        </div>

        <div className="pt-6">
          <Button variant="primary" type="submit" disabled={loading} className="w-full md:w-auto bg-brand-green text-white hover:bg-brand-green-light font-bold rounded-full px-10 py-3 text-lg">
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  );
}
