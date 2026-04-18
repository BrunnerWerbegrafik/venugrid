/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#1fb3da',
          bright: '#1fb3da',
        },
        ink: {
          900: '#0a0a0a',
          800: '#111111',
          700: '#161616',
        },
      },
      fontFamily: {
        sans: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      backdropBlur: {
        nav: '12px',
      },
    },
  },
  plugins: [],
};
