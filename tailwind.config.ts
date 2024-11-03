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
        900: '#000103',
      },
    },
    extend: {
      gap: {
        'custom-gap': 'clamp(1rem, calc(2vw / 0.48), 2rem)',
      },
      margin: {
        'custom-margin-small':
          'calc(clamp(1.5rem,4.1666666667vw,3rem) + clamp(1rem,4.1666666667vw,2rem))',
        'custom-margin':
          'calc(clamp(1.5rem,4.1666666667vw,3rem) + clamp(1rem,4.1666666667vw,2rem) + 1rem)',
      },
      gridTemplateColumns: {
        'custom-colums': 'clamp(1.5rem,4.1666666667vw,3rem) 1fr auto',
      },
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
      transitionTimingFunction: {
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        floating: {
          '0%': { transform: 'translate(0, 0rem)' },
          '50%': { transform: 'translate(0, 0.15rem)' },
          '100%': { transform: 'translate(0, -0rem)' },
        },
      },
      animation: {
        floating: 'floating 2s ease-in-out infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              color: '#F0F7F7',
            },
            strong: {
              background:
                'linear-gradient(266.36deg, #2DD282 1.76%, #90F4E8 100%)',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
              'background-clip': 'text',
              'text-fill-color': 'transparent',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
