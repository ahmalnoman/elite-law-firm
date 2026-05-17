import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#222222',
          500: '#2a2a2a',
        },
        gold: {
          DEFAULT: '#c9a961',
          50:  '#fbf6e7',
          100: '#f4e9c4',
          200: '#e9d599',
          300: '#dcbf6e',
          400: '#d1b04f',
          500: '#c9a961',
          600: '#a88a47',
          700: '#876c34',
          800: '#5d4922',
          900: '#332810',
        },
        bone: {
          DEFAULT: '#f5f1e8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-almarai)', 'system-ui', 'sans-serif'],
        latin: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #c9a961 35%, #a88a47 65%, #876c34 100%)',
        'gold-shimmer': 'linear-gradient(110deg, transparent 25%, rgba(220,191,110,0.45) 50%, transparent 75%)',
        'radial-gold': 'radial-gradient(ellipse at center, rgba(201,169,97,0.18) 0%, transparent 60%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.78 0 0 0 0 0.66 0 0 0 0 0.38 0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-6px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(201,169,97,0.0)' },
          '50%':     { boxShadow: '0 0 32px 4px rgba(201,169,97,0.35)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.9s cubic-bezier(.2,.7,.2,1) both',
        glow: 'glow 3.2s ease-in-out infinite',
      },
      boxShadow: {
        'gold-soft': '0 12px 40px -12px rgba(201,169,97,0.35)',
        'gold-edge': 'inset 0 0 0 1px rgba(201,169,97,0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
