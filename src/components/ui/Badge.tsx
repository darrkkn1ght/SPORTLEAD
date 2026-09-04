import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'gold' | 'red' | 'muted' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'muted', className = '' }: BadgeProps) {
  const variants = {
    green: 'bg-brand-green text-white',
    gold: 'bg-brand-gold text-charcoal',
    red: 'bg-brand-red text-white',
    muted: 'bg-warm-gray text-charcoal border border-warm-border',
    outline: 'bg-transparent border border-gray-300 text-gray-600',
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
