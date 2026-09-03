import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}

export function Container({ children, className = '', size = 'default' }: ContainerProps) {
  const sizes = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-[1400px]',
  }
  
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizes[size]} ${className}`}>
      {children}
    </div>
  )
}
