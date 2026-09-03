'use client'

import React from 'react'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy'
    
    const variants = {
      primary: 'bg-brand-red text-white hover:bg-brand-red-dark focus:ring-brand-red',
      secondary: 'bg-brand-gold text-navy hover:bg-brand-gold-light focus:ring-brand-gold',
      outline: 'border-2 border-white text-white hover:bg-white/10 focus:ring-white',
      ghost: 'text-white hover:text-brand-gold focus:ring-brand-gold',
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const classes = [
      baseStyles,
      variants[variant],
      sizes[size],
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      className
    ].filter(Boolean).join(' ')

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
