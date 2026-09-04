'use client'

import React from 'react'
import Link from 'next/link'

interface CardProps {
  children: React.ReactNode
  className?: string
  href?: string
  hoverable?: boolean
}

export function Card({ children, className = '', href, hoverable = false }: CardProps) {
  const baseClasses = 'bg-white rounded-2xl border border-warm-border p-6 md:p-8 text-charcoal shadow-card'
  const hoverClasses = hoverable ? 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-brand-green/20' : ''
  const classes = `${baseClasses} ${hoverClasses} ${className}`.trim()
  
  if (href) {
    return (
      <Link href={href} className={`block ${classes}`}>
        {children}
      </Link>
    )
  }
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}
