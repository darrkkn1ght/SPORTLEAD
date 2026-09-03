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
  const baseClasses = 'bg-brand-navy-light rounded-2xl border border-white/5 p-6 md:p-8 text-white shadow-lg'
  const hoverClasses = hoverable ? 'transition-all duration-300 hover:border-brand-gold/30 hover:shadow-xl hover:-translate-y-1' : ''
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
