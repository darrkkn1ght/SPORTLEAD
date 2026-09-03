import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'green' | 'red' | 'navy' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'navy', className = '' }: BadgeProps) {
  const variants = {
    gold: 'bg-brand-gold text-brand-navy',
    green: 'bg-brand-green text-white',
    red: 'bg-brand-red text-white',
    navy: 'bg-white/10 text-white border border-white/5',
    outline: 'bg-transparent border border-white/20 text-gray-300',
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
