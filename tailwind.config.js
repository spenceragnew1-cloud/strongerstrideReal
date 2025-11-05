import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#00FF00',
          'green-dark': '#00CC00',
          'green-light': '#33FF33',
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};
