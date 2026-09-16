'use client'

import React from 'react'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light' | 'ghost'
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
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-warm-white'
    
    const variants: Record<string, string> = {
      primary: 'bg-brand-green text-white hover:bg-brand-green-light focus:ring-brand-green',
      secondary: 'bg-warm-gray text-charcoal hover:bg-grey-light focus:ring-charcoal',
      outline: 'border-2 border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal/5 focus:ring-charcoal',
      'outline-light': 'border-2 border-white/30 text-white hover:border-white hover:bg-white/10 focus:ring-white',
      ghost: 'text-charcoal hover:text-brand-green focus:ring-brand-green',
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
        <Link href={href} className={classes} onClick={props.onClick as any}>
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
