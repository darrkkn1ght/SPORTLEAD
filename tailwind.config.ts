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
        navy: {
          DEFAULT: '#0A1628',
          light: '#162544',
          dark: '#060E1A',
        },
        brand: {
          red: {
            DEFAULT: '#C8102E',
            dark: '#A00D24',
          },
          gold: {
            DEFAULT: '#D4A843',
            light: '#E8B84B',
          },
          green: {
            DEFAULT: '#1B7340',
            dark: '#145A32',
          },
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
    },
  },
  plugins: [],
};
export default config;
