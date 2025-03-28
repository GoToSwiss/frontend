/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        theme_primary: '#111827',
        theme_secondary: '#4B5563',
        theme_tertiary: '#6B7280',
        theme_black: '#000000',
        web_bg: '#F9FAFB',
        border_color: '#D1D5DB',
      },
    },
  },
  plugins: [],
};
