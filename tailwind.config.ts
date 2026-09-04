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
