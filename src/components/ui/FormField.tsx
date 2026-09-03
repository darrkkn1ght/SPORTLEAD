'use client'

import React from 'react'
import { ChevronDown } from './Icon'

type InputType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'file' | 'checkbox'

interface FormFieldProps {
  label: string
  name: string
  type?: InputType
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  error?: string
  value?: string | boolean | string[]
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  rows?: number
  accept?: string
  helpText?: string
  className?: string
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  options,
  error,
  value,
  onChange,
  rows = 4,
  accept,
  helpText,
  className = '',
}: FormFieldProps) {
  const baseInputStyles = 'w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 transition-colors shadow-sm'
  const textInputStyles = `${baseInputStyles} px-4 py-3`
  
  const id = `field-${name}`

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {type !== 'checkbox' && (
        <label htmlFor={id} className="text-sm font-semibold text-white">
          {label} {required && <span className="text-brand-gold">*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          value={value as string}
          onChange={onChange}
          rows={rows}
          className={textInputStyles}
        />
      ) : type === 'select' ? (
        <div className="relative">
          <select
            id={id}
            name={name}
            required={required}
            value={value as string}
            onChange={onChange}
            className={`${textInputStyles} appearance-none pr-10`}
          >
            <option value="" disabled>{placeholder || 'Select an option'}</option>
            {options?.map((opt) => (
               <option key={opt.value} value={opt.value} className="bg-brand-navy text-white">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
            <ChevronDown size={16} />
          </div>
        </div>
      ) : type === 'checkbox' ? (
        <div className="flex items-start gap-3">
          <div className="flex items-center h-6">
            <input
              id={id}
              name={name}
              type="checkbox"
              required={required}
              checked={value as boolean}
              onChange={onChange}
              className="w-5 h-5 rounded border-white/20 bg-brand-navy-light text-brand-gold focus:ring-brand-gold focus:ring-offset-brand-navy transition-colors cursor-pointer"
            />
          </div>
          <label htmlFor={id} className="text-sm font-medium text-white cursor-pointer select-none pt-0.5">
            {label} {required && <span className="text-brand-gold">*</span>}
          </label>
        </div>
      ) : type === 'file' ? (
        <input
          id={id}
          name={name}
          type="file"
          required={required}
          accept={accept}
          onChange={onChange}
          className={`${baseInputStyles} px-3 py-2.5 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value as string}
          onChange={onChange}
          className={textInputStyles}
        />
      )}

      {error && <p className="text-sm font-medium text-red-400">{error}</p>}
      {!error && helpText && <p className="text-sm text-gray-400">{helpText}</p>}
    </div>
  )
}
