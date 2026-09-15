'use client';

import React, { useMemo } from 'react';
import { AFRICAN_COUNTRIES, AfricanCountry } from '@/lib/countries';

interface PhoneFieldProps {
  label: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDialCodeChange?: (dialCode: string) => void;
  selectedCountry?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  placeholder?: string;
  className?: string;
}

export function PhoneField({
  label,
  name = 'telephone',
  value,
  onChange,
  onDialCodeChange,
  selectedCountry,
  required = false,
  error,
  helpText,
  placeholder = '800 000 0000',
  className = '',
}: PhoneFieldProps) {
  // Determine which dial code is currently active
  const activeCountry = useMemo(() => {
    if (selectedCountry) {
      const match = AFRICAN_COUNTRIES.find(
        (c) => c.name.toLowerCase() === selectedCountry.trim().toLowerCase()
      );
      if (match) return match;
    }

    // Otherwise check if value starts with a known dial code
    const trimmed = (value || '').trim();
    // Sort by length descending (+234 before +20)
    const sorted = [...AFRICAN_COUNTRIES].sort(
      (a, b) => b.dialCode.length - a.dialCode.length
    );
    for (const country of sorted) {
      if (trimmed.startsWith(country.dialCode)) {
        return country;
      }
    }

    // Default to Nigeria (+234) as default African primary headquarters
    return AFRICAN_COUNTRIES.find((c) => c.code === 'NG') || AFRICAN_COUNTRIES[0];
  }, [selectedCountry, value]);

  const activeDialCode = activeCountry?.dialCode || '+234';

  // Extract the local phone number without the dial code
  const localNumber = useMemo(() => {
    const trimmed = (value || '').trim();
    if (trimmed.startsWith(activeDialCode)) {
      return trimmed.slice(activeDialCode.length).trim();
    }
    // Also check generic startsWith +
    if (trimmed.startsWith('+')) {
      const match = trimmed.match(/^\+\d+\s*(.*)$/);
      return match ? match[1] : trimmed;
    }
    return trimmed;
  }, [value, activeDialCode]);

  // Handle dial code dropdown selection
  const handleDialCodeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    const newFullPhone = localNumber ? `${newCode} ${localNumber}` : `${newCode} `;

    // Synthetic event to bubble to form change handler
    const syntheticEvent = {
      target: {
        name,
        value: newFullPhone,
        type: 'tel',
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
    if (onDialCodeChange) {
      onDialCodeChange(newCode);
    }
  };

  // Handle local number input change
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawLocal = e.target.value;
    // Don't duplicate dial code if user types it in
    let cleanLocal = rawLocal;
    if (cleanLocal.startsWith(activeDialCode)) {
      cleanLocal = cleanLocal.slice(activeDialCode.length).trim();
    }
    const newFullPhone = `${activeDialCode} ${cleanLocal}`.trim();

    const syntheticEvent = {
      target: {
        name,
        value: newFullPhone,
        type: 'tel',
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-semibold text-charcoal mb-2">
        {label}
        {required && <span className="text-brand-red ml-1">*</span>}
      </label>

      <div className="flex rounded-xl shadow-sm border border-warm-border focus-within:border-brand-green focus-within:ring-1 focus-within:ring-brand-green overflow-hidden transition-all bg-white">
        {/* Country Code Dropdown */}
        <div className="relative bg-warm-gray border-r border-warm-border flex items-center">
          <select
            value={activeDialCode}
            onChange={handleDialCodeSelect}
            aria-label="Country calling code"
            className="h-full pl-3 pr-8 py-3 bg-transparent text-charcoal font-medium text-sm focus:outline-none cursor-pointer appearance-none"
          >
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c.code} value={c.dialCode}>
                {c.flag} {c.code} ({c.dialCode})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Local Number Input */}
        <input
          type="tel"
          name={name}
          value={localNumber}
          onChange={handleNumberInput}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 text-charcoal placeholder:text-gray-400 focus:outline-none text-base"
        />
      </div>

      {helpText && !error && (
        <p className="mt-1.5 text-xs text-gray-500">{helpText}</p>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-brand-red font-medium flex items-center gap-1">
          <span>•</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
