import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hack Club inspired palette - no purple, no gradients
        hackclub: {
          red: '#ec3750',
          darkRed: '#d63047',
        },
        lab: {
          bg: '#f8f9fa',
          surface: '#ffffff',
          surfaceAlt: '#f1f3f5',
          border: '#dee2e6',
          borderLight: '#e9ecef',
        },
        slate: {
          950: '#0c1117',
          900: '#151b23',
          850: '#1c232d',
          800: '#252d38',
          700: '#333d4a',
          600: '#495565',
          500: '#637083',
          400: '#8694a8',
          300: '#a8b5c5',
          200: '#ccd4de',
          100: '#e7ebf0',
          50: '#f4f6f8',
        },
        // Muted cyan accent
        accent: {
          DEFAULT: '#3d9ca8',
          dark: '#2d7a84',
          light: '#5ab8c4',
          muted: '#a8d5db',
          subtle: '#e8f4f6',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'panel': '0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 4px rgba(0, 0, 0, 0.02)',
      },
      borderRadius: {
        'card': '6px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
