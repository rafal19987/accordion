import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    colors: {
      neutral: {
        200: '#F0F7F7',
        400: '#c6cdcc',
      },
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          600: '#042B2B',
        },
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(266.36deg, #2DD282 1.76%, #90F4E8 100%)',
      },
      keyframes: {
        floating: {
          '0%': { transform: 'translate(0, 0rem)' },
          '50%': { transform: 'translate(0, 0.25rem)' },
          '100%': { transform: 'translate(0, -0rem)' },
        },
      },
      animation: {
        floating: 'floating 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
