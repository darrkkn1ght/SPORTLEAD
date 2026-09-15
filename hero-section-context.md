# Hero Section — Implementation Context

> **Purpose:** This document provides a complete, self-contained reference for the homepage hero section of the SportLead Africa website. It is intended to be read by someone (or something) with no other access to the codebase.

---

## 1. Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 14.2** (App Router, React Server Components) |
| Language | TypeScript / TSX |
| Styling | **Tailwind CSS** with custom utility classes defined in `globals.css` and extended in `tailwind.config.ts`. Some values are applied via inline `style` props (responsive `clamp()` sizes, rgba colors). |
| Animation | **Framer Motion** (`motion.div` wrappers) |
| Font | **Outfit** (loaded via `next/font` as a CSS variable `--font-outfit`, applied globally via Tailwind's `fontFamily.sans`) |

### File paths

| File | Role |
|---|---|
| `src/components/home/Hero.tsx` | Hero component (all markup + logic) |
| `src/app/globals.css` | Global styles, CSS custom properties, custom Tailwind utility classes |
| `tailwind.config.ts` | Tailwind theme extension (colors, fonts, spacing, shadows, animations) |
| `src/components/ui/Button.tsx` | Shared `<Button>` component used for the two CTAs |
| `src/components/ui/Container.tsx` | Shared `<Container>` wrapper (max-width + horizontal padding) |

---

## 2. Full Source Code

### `src/components/home/Hero.tsx`

```tsx
'use client';
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const STATS = [
  { value: "15+", label: "Countries" },
  { value: "50+", label: "Projects" },
  { value: "10", label: "Years" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-charcoal overflow-hidden flex items-center pt-24 pb-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-charcoal/80 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2936&auto=format&fit=crop"
          alt="Professional Sport Planning"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 grayscale"
        />
      </div>

      <Container className="relative z-10 w-full">
        {/* ── Two-column row: Headline (left) + Stat strip (right) ── */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-12 lg:gap-20">
          {/* ── Left column: Headline & Eyebrow ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:max-w-[640px] flex-shrink-0"
          >
            {/* Eyebrow */}
            <span
              className="inline-block text-brand-green-light font-semibold mb-5"
              style={{
                fontSize: "0.8125rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Pan-African Sport Development
            </span>

            {/* Headline — split weight */}
            <h1
              className="text-white"
              style={{
                fontSize: "clamp(1.75rem, 3vw + 1.2rem, 3.25rem)",
                lineHeight: 1.15,
              }}
            >
              <span className="font-extrabold">
                Building Better Sport Systems{" "}
              </span>
              <span className="font-normal" style={{ opacity: 0.82 }}>
                through Infrastructure, Governance, Strategy &amp; Institutional
                Development Across{" "}
                <span className="text-brand-green-light font-semibold">
                  Africa.
                </span>
              </span>
            </h1>
          </motion.div>

          {/* ── Right column: stat strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="w-full lg:w-auto flex flex-row lg:flex-col gap-8 lg:gap-10 justify-center items-center lg:items-start"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center lg:items-start"
              >
                <span
                  className="text-brand-green-light font-extrabold leading-none"
                  style={{ fontSize: "clamp(2rem, 2vw + 1rem, 2.75rem)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-white/50 font-medium mt-1"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Left column continuation: Accent bar, Paragraph, CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:max-w-[640px] mt-8"
        >
          {/* Accent bar */}
          <div className="w-16 h-[3px] bg-brand-green-light rounded-full mb-8" />

          {/* Supporting paragraph — de-emphasised */}
          <p
            className="font-light leading-relaxed mb-8 max-w-lg"
            style={{
              fontSize: "clamp(0.95rem, 0.5vw + 0.85rem, 1.125rem)",
              color: "rgba(255,255,255,0.68)",
            }}
          >
            SportLead Africa helps sport organisations plan better facilities,
            strengthen institutions, improve governance and administration,
            develop effective strategies and deliver complex sport-sector
            projects.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              href="/discuss-a-project"
              className="font-semibold tracking-wide bg-brand-green text-white hover:bg-brand-green-light border-2 border-brand-green hover:border-brand-green-light shadow-md rounded-full px-6 py-2.5 text-sm sm:text-base"
            >
              Discuss a Project
            </Button>
            <Button
              variant="outline-light"
              href="/services"
              className="font-semibold tracking-wide rounded-full px-6 py-2.5 text-sm sm:text-base border-2 border-white/30 text-white hover:border-white hover:bg-white/10"
            >
              Explore Our Services
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
```

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --brand-green: #0D4A2B;
    --brand-green-light: #147A3E;
    --brand-green-dark: #093D23;
    --brand-green-muted: #E8F5EE;
    --brand-gold: #C8A951;
    --brand-gold-light: #D4B96A;
    --brand-red: #C8102E;
    --brand-red-dark: #A00D24;
    --charcoal: #1A1A2E;
    --charcoal-light: #2D2D44;
    --charcoal-dark: #111122;
    --warm-white: #FAFAF8;
    --warm-gray: #F3F3F0;
    --warm-border: #E5E5E0;
    --off-white: #F5F5F0;
  }

  body {
    background-color: var(--warm-white);
    color: var(--charcoal);
    @apply antialiased selection:bg-brand-green selection:text-white;
  }

  a {
    @apply transition-colors duration-300;
  }
}

@layer utilities {
  .bg-charcoal {
    background-color: var(--charcoal);
  }

  .bg-charcoal-light {
    background-color: var(--charcoal-light);
  }

  .bg-charcoal-dark {
    background-color: var(--charcoal-dark);
  }

  .bg-warm-white {
    background-color: var(--warm-white);
  }

  .bg-warm-gray {
    background-color: var(--warm-gray);
  }

  .bg-brand-green {
    background-color: var(--brand-green);
  }

  .bg-brand-green-light {
    background-color: var(--brand-green-light);
  }

  .bg-brand-green-muted {
    background-color: var(--brand-green-muted);
  }

  .bg-brand-gold {
    background-color: var(--brand-gold);
  }

  .text-charcoal {
    color: var(--charcoal);
  }

  .text-charcoal-light {
    color: var(--charcoal-light);
  }

  .text-brand-green {
    color: var(--brand-green);
  }

  .text-brand-green-light {
    color: var(--brand-green-light);
  }

  .text-brand-gold {
    color: var(--brand-gold);
  }

  .text-warm-white {
    color: var(--warm-white);
  }

  .border-brand-green {
    border-color: var(--brand-green);
  }

  .border-brand-gold {
    border-color: var(--brand-gold);
  }

  .border-warm {
    border-color: var(--warm-border);
  }

  .text-gradient {
    background-image: linear-gradient(135deg, #0D4A2B 0%, #147A3E 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-label {
    @apply text-xs uppercase tracking-[0.2em] text-brand-green font-bold block mb-4;
    letter-spacing: 0.25em;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--warm-gray);
}

::-webkit-scrollbar-thumb {
  background: #C4C4BE;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9A9A94;
}
```

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1A1A2E',
          light: '#2D2D44',
          dark: '#111122',
        },
        brand: {
          green: {
            DEFAULT: '#0D4A2B',
            light: '#147A3E',
            dark: '#093D23',
            muted: '#E8F5EE',
          },
          gold: {
            DEFAULT: '#C8A951',
            light: '#D4B96A',
          },
          red: {
            DEFAULT: '#C8102E',
            dark: '#A00D24',
          },
        },
        warm: {
          white: '#FAFAF8',
          gray: '#F3F3F0',
          border: '#E5E5E0',
        },
        'off-white': '#F5F5F0',
        'grey-light': '#E8E8E3',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.05)',
        'nav': '0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
        'soft': '0 2px 8px rgba(0,0,0,0.04)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
```

### `src/components/ui/Button.tsx` (dependency)

```tsx
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
```

### `src/components/ui/Container.tsx` (dependency)

```tsx
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
```

---

## 3. Design Tokens in Use

### Colors (hero-specific)

| Token / Value | Usage |
|---|---|
| `charcoal` / `#1A1A2E` | Section background (`bg-charcoal`), also used at 80% opacity as the image overlay (`bg-charcoal/80`) |
| `brand-green` / `#0D4A2B` | Primary CTA button fill (`bg-brand-green`) |
| `brand-green-light` / `#147A3E` | Eyebrow text, "Africa." highlight in headline, accent bar, stat numbers, CTA hover state |
| `white` | Headline text (`text-white`), primary CTA text |
| `rgba(255,255,255,0.68)` | Supporting paragraph text (inline style — ~68% white) |
| `white/50` | Stat labels (`text-white/50` — 50% white) |
| `white/30` | Outline CTA border (`border-white/30`, from `outline-light` Button variant) |

### Typography

| Element | Font Family | Weight | Size | Line Height |
|---|---|---|---|---|
| Eyebrow | Outfit (inherited) | 600 (`font-semibold`) | `0.8125rem` (13px) | default |
| Headline — bold part | Outfit | 800 (`font-extrabold`) | `clamp(1.75rem, 3vw + 1.2rem, 3.25rem)` | `1.15` |
| Headline — light part | Outfit | 400 (`font-normal`) at 82% opacity | same as above (inherited from `<h1>`) | `1.15` |
| Headline — "Africa." | Outfit | 600 (`font-semibold`) | inherited | inherited |
| Supporting paragraph | Outfit | 300 (`font-light`) | `clamp(0.95rem, 0.5vw + 0.85rem, 1.125rem)` | `leading-relaxed` (1.625) |
| Stat numbers | Outfit | 800 (`font-extrabold`) | `clamp(2rem, 2vw + 1rem, 2.75rem)` | `leading-none` (1) |
| Stat labels | Outfit | 500 (`font-medium`) | `0.75rem` (12px) | default |

### CSS Custom Properties referenced

All are defined in `globals.css` `:root` and mirrored in `tailwind.config.ts`:

```
--brand-green:       #0D4A2B
--brand-green-light: #147A3E
--charcoal:          #1A1A2E
```

---

## 4. Layout Structure

### Desktop (≥ 1024px, `lg:` breakpoint)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  <section>  min-h-screen, bg-charcoal, flex items-center, pt-24 pb-16  │
│                                                                        │
│  ┌─ Background layer (z-0) ─────────────────────────────────────────┐  │
│  │  Unsplash image (fill, grayscale, 30% opacity)                   │  │
│  │  + charcoal overlay at 80% opacity                               │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌─ Container (z-10, max-w-7xl, mx-auto, px-4/6/8) ────────────────┐  │
│  │                                                                   │  │
│  │  ┌─ Flex row (items-center, justify-between, gap-20) ─────────┐  │  │
│  │  │                                                             │  │  │
│  │  │  ┌─ Left col (max-w-[640px]) ────┐  ┌─ Right col ────────┐ │  │  │
│  │  │  │                               │  │                     │ │  │  │
│  │  │  │  EYEBROW (green, uppercase)   │  │  15+                │ │  │  │
│  │  │  │  HEADLINE (split weight)      │  │  Countries          │ │  │  │
│  │  │  │  ── accent bar ──             │  │                     │ │  │  │
│  │  │  │  Supporting paragraph         │  │  50+                │ │  │  │
│  │  │  │                               │  │  Projects           │ │  │  │
│  │  │  │  [Discuss] [Explore]          │  │                     │ │  │  │
│  │  │  │                               │  │  10                 │ │  │  │
│  │  │  └───────────────────────────────┘  │  Years              │ │  │  │
│  │  │                                     └─────────────────────┘ │  │  │
│  │  └─────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

- Two-column flex row at `lg:` breakpoint (1024px+).
- Left column constrained to `640px` max-width, `flex-shrink-0`.
- Right column is auto-width; stats stack vertically with `gap-10`.
- Both columns vertically centered via `lg:items-center` on the flex parent.
- Space between columns: `gap-20` (5rem).

### Mobile (< 1024px)

- Single column (`flex-col`), gap `gap-12` (3rem) between text block and stat strip.
- Text column is full width (`w-full`).
- Stat strip becomes a horizontal row (`flex-row`, `gap-8`), centered (`justify-center`), with each stat's number and label centered (`items-center`).
- Headline floor size: `1.75rem` (28px) via `clamp()` minimum.

### Animation

- Left column: fade-in + slide-up (y: 30 → 0, 0.8s ease-out).
- Right column: same animation with 0.35s delay.

---

## 5. Change History

The following changes were made to this component in the current session (starting from the original implementation). All existing copy was preserved.

1. **Eyebrow label added** — `"Pan-African Sport Development"` in uppercase, `0.8125rem`, `0.2em` letter-spacing, `text-brand-green-light`, placed above the headline with `mb-5`.

2. **Headline split into two visual weights** — the original single `font-bold` block was split:
   - `"Building Better Sport Systems"` → `font-extrabold` (800).
   - `"through Infrastructure, Governance, Strategy & Institutional Development Across Africa."` → `font-normal` (400) at 82% opacity.
   - `"Africa."` retains the green accent color (`text-brand-green-light`) and uses `font-semibold`.

3. **Responsive headline sizing** — replaced the old stepped breakpoint classes (`text-3xl sm:text-4xl md:text-5xl lg:text-6xl`) with a single `clamp(1.75rem, 3vw + 1.2rem, 3.25rem)`. Line-height tightened to `1.15`.

4. **Headline width constrained** — text column capped at `lg:max-w-[640px]` (was `max-w-5xl` ≈ 64rem).

5. **Supporting paragraph de-emphasised** — font-size reduced to `clamp(0.95rem, 0.5vw + 0.85rem, 1.125rem)`, color changed to `rgba(255,255,255,0.68)` (was `text-gray-300`), width capped at `max-w-lg` (was `max-w-3xl`).

6. **Accent bar refined** — width narrowed from `w-20` to `w-16`, height from `h-1` to `h-[3px]`, color changed from `bg-brand-green` to `bg-brand-green-light`.

7. **Stat strip added** — new right-side column with three items (15+ Countries, 50+ Projects, 10 Years). Numbers in `text-brand-green-light font-extrabold`, labels in `text-white/50` uppercase. Stacks vertically on desktop, horizontally on mobile.

8. **Two-column layout** — hero content converted from a single left-aligned block to a flex row (`lg:flex-row`) with the text on the left and stat strip on the right, vertically centered.

9. **Vertical spacing increased** — more space between headline and paragraph (`mb-8`), paragraph and CTAs (`mb-12`), and between the text block and stat strip (`gap-12` mobile / `gap-20` desktop).

10. **Container top margin removed** — originally had `mt-16 md:mt-8` which was adding uneven vertical offset; removed in favour of the section's existing `pt-24`.

### What's still rough / open for refinement

- The stat strip vertical alignment relative to the headline may still need fine-tuning depending on actual content length and viewport.
- The stat values (`15+`, `50+`, `10`) are hardcoded in the component — they are placeholder/illustrative and may need to be moved to constants or a CMS.
- CTA button styling carries over from the original; sizing/weight has not been rebalanced against the lighter headline yet.
