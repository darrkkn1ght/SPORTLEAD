'use client'

import React from 'react'
import { ChevronDown } from './Icon'

type InputType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'file' | 'checkbox'

interface SelectOption {
  label: string
  value: string
  group?: string
}

interface FormFieldProps {
  label: string
  name: string
  type?: InputType
  placeholder?: string
  required?: boolean
  options?: SelectOption[]
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
  const baseInputStyles = 'w-full bg-white border border-gray-200 rounded-xl text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-colors shadow-sm'
  const textInputStyles = `${baseInputStyles} px-4 py-3`
  
  const id = `field-${name}`

  const hasGroups = options?.some((opt) => opt.group)
  const groupedOptions: { group: string; items: SelectOption[] }[] = []
  if (hasGroups && options) {
    options.forEach((opt) => {
      const gName = opt.group || 'Other'
      let g = groupedOptions.find((item) => item.group === gName)
      if (!g) {
        g = { group: gName, items: [] }
        groupedOptions.push(g)
      }
      g.items.push(opt)
    })
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {type !== 'checkbox' && (
        <label htmlFor={id} className="text-sm font-semibold text-charcoal">
          {label} {required && <span className="text-brand-green">*</span>}
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
            value={(value as string) || ''}
            onChange={onChange}
            className={`${textInputStyles} appearance-none pr-10`}
          >
            <option value="" disabled>{placeholder || 'Select an option'}</option>
            {hasGroups
              ? groupedOptions.map((g) => (
                  <optgroup key={g.group} label={g.group} className="font-semibold text-charcoal bg-white">
                    {g.items.map((opt) => (
                      <option key={opt.value} value={opt.value} className="font-normal text-charcoal bg-white">
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                ))
              : options?.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-white text-charcoal">
                    {opt.label}
                  </option>
                ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
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
              className="w-5 h-5 rounded border-gray-300 bg-white text-brand-green focus:ring-brand-green focus:ring-offset-white transition-colors cursor-pointer"
            />
          </div>
          <label htmlFor={id} className="text-sm font-medium text-gray-600 cursor-pointer select-none pt-0.5">
            {label} {required && <span className="text-brand-green">*</span>}
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
          className={`${baseInputStyles} px-3 py-2.5 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-green-muted file:text-brand-green hover:file:bg-brand-green/10 cursor-pointer`}
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

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      {!error && helpText && <p className="text-sm text-gray-500">{helpText}</p>}
    </div>
  )
}
