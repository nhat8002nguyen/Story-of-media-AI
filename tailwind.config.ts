import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-blue-left': '#EAF3FC',
        'bg-blue-right': '#F2F7FC',
        'primary-color-r': '#406BAC',
        'primary-color-l': '#5589DA',
        'text-grey': '#798297',
        'text-black': '#2B3241',
        facebook: '#1877F2',
        instagram: {
          100: '#F58529', // Lightest Shade
        },
        twitter: '#0F141A',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'big-title': '2.5rem',
        tiny: '0.65rem',
      },
      boxShadow: {
        'primary-button': '1px 2px 2px rgba(0, 0, 0, 0.2)',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
