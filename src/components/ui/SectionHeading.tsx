import React from 'react'

interface SectionHeadingProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: 'left' | 'center'
  center?: boolean
  accent?: boolean
  light?: boolean
  className?: string
}

export function SectionHeading({ 
  title, 
  subtitle, 
  align,
  center = false,
  accent = false,
  light = false,
  className = '' 
}: SectionHeadingProps) {
  const isCenter = center || align === 'center'
  const alignClass = isCenter ? 'text-center' : 'text-left'
  const flexAlignClass = isCenter ? 'items-center mx-auto' : 'items-start'
  const titleColor = light ? 'text-white' : 'text-navy'
  const subtitleColor = light ? 'text-gray-300' : 'text-gray-600'
  
  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {accent && (
        <div className={`w-12 h-1 bg-brand-gold ${flexAlignClass}`} />
      )}
      <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${subtitleColor} ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
