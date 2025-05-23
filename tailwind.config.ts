/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      animation: {
        'rainbow-text': 'rainbow 10s linear infinite',
      },
      keyframes: {
        rainbow: {
          '0%': { color: '#ff0000' },
          '16%': { color: '#ff9900' },
          '33%': { color: '#33cc33' },
          '50%': { color: '#00ccff' },
          '66%': { color: '#6633cc' },
          '83%': { color: '#ff3399' },
          '100%': { color: '#ff0000' },
        },
      },
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
