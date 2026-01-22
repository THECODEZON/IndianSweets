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
        primary: {
          maroon: '#7B1E3A',
          gold: '#F4A261',
          green: '#1B4332',
        },
        accent: {
          yellow: '#FFD166',
          pink: '#E76F51',
        },
        bg: {
          cream: '#FFF8F0',
          beige: '#FAEDCD',
        },
        text: {
          brown: '#3A2D28',
          charcoal: '#2F2F2F',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
};
export default config;
